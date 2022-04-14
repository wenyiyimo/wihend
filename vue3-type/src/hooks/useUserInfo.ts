import {reactive} from '@vue/composition-api'
import {onLoad,onShow} from 'uni-composition-api'
import { gdMapCityName as cityName } from '@/common/variable'
import useSyncDataHooks from './useSyncDataHooks'
import {positionLatLng} from '@/common/variable'
export default function(route) {
  const positionGd=reactive({
    city:'',//城市
    weather:'',//天气
    temperature:'',
    addressValue:'正在加载当前城市和天气中...',
    position:{

    }//定位
  })
  const {storeSaveSync,storeGetSync} =useSyncDataHooks()
  onLoad(()=>{

  })
  onShow(()=>{
    // #ifdef H5
    setTimeout(() => {
      getH5MapInit();
    }, 1000);
    // #endif
  })
  //定位相关配置
  function settingAMap(AMap){
    const geolocation = new AMap.Geolocation({
      enableHighAccuracy: true, //是否使用高精度定位，默认:true
      timeout: 500000, //超过10秒后停止定位，默认：无穷大
      maximumAge: 0, //定位结果缓存0毫秒，默认：0
      convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
      showButton: true, //显示定位按钮，默认：true
      buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
      buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
      showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
      panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
      zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    })
    return geolocation
  }
  // h5定位
  const getH5MapInit=()=> {
    const mapObj = new AMap.Map('iCenter');
    mapObj.plugin('AMap.Geolocation', function() {
      const geolocation =settingAMap(AMap)
      mapObj.addControl(geolocation);
      geolocation.getCurrentPosition((a,b)=>{
      });
      //返回定位信息
      AMap.event.addListener(geolocation, 'complete', onComplete);
      //返回定位出错信息
      AMap.event.addListener(geolocation, 'error', err=> {
        positionGd.addressValue='加载失败,请重新加载'
        onError(err)
      });
    });
  }

  //定义getLocation类型wgs84方式逻辑
  function getLocationwgs84(){
    uni.getLocation({
      type: 'wgs84',
      altitude:true,
      highAccuracyExpireTime: 3001,
      isHighAccuracy:true,
      success: res=>setGeolocation(res),
      fail:e=>setGeolocation({
        longitude:positionLatLng.lng,latitude:positionLatLng.lat
      })
    });
  }
  //保存定位相关信息
  function setGeolocation(res){
    const data2={
      position:{
        Q:res.latitude,
        R: res.longitude,
        lat: res.latitude,
        lng: res.longitude
      }
    }
    storeSaveSync('h5-geolocation', data2)
  }
  //加载天气查询插件
  function getWeather(city) {
    AMap.plugin('AMap.Weather', () => {
      //创建天气查询实例
      const weather = new AMap.Weather()
      //执行实时天气信息查询
      weather?.getLive(city, (err, { city, weather, temperature }) => {
        positionGd.city=city
        positionGd.weather=weather
        positionGd.temperature=temperature
        positionGd.addressValue = ``
      })
    })
  }
  function onComplete(data){
    if(!data){
      getLocationwgs84()
    }
    const {addressComponent:{ city },  info, status,} = data
    storeSaveSync('h5-geolocation', data)
    if(route.path==='/'){
      if (info === 'SUCCESS' && status === 1) {
        positionGd.addressValue='正在加载当前城市和天气中...'
        if(city){
          getWeather(city)
        }else{
          getWeather(cityName)
        }
      }else{
        positionGd.addressValue='加载失败,请重新加载'
        getH5MapInit()
      }
    }else{
      if(city){
        getWeather(city)
      }else{
        getWeather(cityName)
      }
    }


  }
  function onError(error){
    if(error.status===0){
      const {value} = storeGetSync("h5-geolocation")
      if(!Object.keys(value?.position).length){
        const data={
          latitude:positionLatLng.lat,
          longitude:positionLatLng.lng
        }
        setGeolocation(data)
      }
    }

  }
  const getGeolocation=(city)=>{
    if(positionGd.addressValue==='加载失败,请重新加载'){
      getH5MapInit()
      if(city){
        getWeather(city)
      }else{
        getWeather(cityName)
      }
    }

  }
  const getPossibleBreakpointsParameterType=()=>{
    const {value} = storeGetSync("h5-geolocation")
    if(value?.position){
      positionGd.position=value.position
    }else{
      // #ifdef H5
      setTimeout(() => {
        getH5MapInit();
      }, 1000);
      // #endif
    }

  }

  return{
    setGeolocation,
    getH5MapInit,
    positionGd,
    getWeather,
    getPossibleBreakpointsParameterType,
    getGeolocation
  }
}
