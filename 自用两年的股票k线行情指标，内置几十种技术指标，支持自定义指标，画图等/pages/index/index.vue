<template>
	<view
		id="k-line-chart"
		class="content">
	</view>
</template>

<script module="klinecharts" lang="renderjs">
	import { init } from 'klinecharts'
	import generatedKLineDataList from './generatedKLineDataList.js'
	export default {
		mounted: function () {
		    const chart = init('k-line-chart')
			chart.setStyleOptions({
				candle: {
					tooltip: {
						labels: ['开', '收', '高', '低'],
						values: function (kLineData) {
							return [
								kLineData.open.toFixed(2),
								kLineData.close.toFixed(2),
								kLineData.high.toFixed(2),
								kLineData.low.toFixed(2),
							]
						}
					}
				},
				technicalIndicator: {
					tooltip: {
						showName: false,
						showParams: false
					}
				},
				yAxis: {
					inside: true,
					axisLine: {
						show: false
					}
				}
			})
			chart.overrideTechnicalIndicator({
				name: 'MA',
				calcParams: [5, 10, 30]
			})
			chart.createTechnicalIndicator('MA', false, { id: 'candle_pane' })
			chart.createTechnicalIndicator('VOL', false, { height: 120, dragEnabled: false })
			chart.createTechnicalIndicator('MACD', false, { height: 120, dragEnabled: false })
			chart.applyNewData([
			  {
			    close: 4976.16,
			    high: 4977.99,
			    low: 4970.12,
			    open: 4972.89,
			    timestamp: 1587660000000,
			    volume: 204,
			  },
			  {
			    close: 4977.33,
			    high: 4979.94,
			    low: 4971.34,
			    open: 4973.2,
			    timestamp: 1587660060000,
			    volume: 194,
			  },
			  {
			    close: 4977.93,
			    high: 4977.93,
			    low: 4974.2,
			    open: 4976.53,
			    timestamp: 1587660120000,
			    volume: 197,
			  },
			  {
			    close: 4966.77,
			    high: 4968.53,
			    low: 4962.2,
			    open: 4963.88,
			    timestamp: 1587660180000,
			    volume: 28,
			  },
			  {
			    close: 4961.56,
			    high: 4972.61,
			    low: 4961.28,
			    open: 4961.28,
			    timestamp: 1587660240000,
			    volume: 184,
			  },
			  {
			    close: 4964.19,
			    high: 4964.74,
			    low: 4961.42,
			    open: 4961.64,
			    timestamp: 1587660300000,
			    volume: 191,
			  },
			  {
			    close: 4968.93,
			    high: 4972.7,
			    low: 4964.55,
			    open: 4966.96,
			    timestamp: 1587660360000,
			    volume: 105,
			  },
			  {
			    close: 4979.31,
			    high: 4979.61,
			    low: 4973.99,
			    open: 4977.06,
			    timestamp: 1587660420000,
			    volume: 35,
			  },
			  {
			    close: 4977.02,
			    high: 4981.66,
			    low: 4975.14,
			    open: 4981.66,
			    timestamp: 1587660480000,
			    volume: 135,
			  },
			  {
			    close: 4985.09,
			    high: 4988.62,
			    low: 4980.3,
			    open: 4986.72,
			    timestamp: 1587660540000,
			    volume: 76,
			  },
			]);
      chart.createAnnotation({
        point: { timestamp: 1587660540000, value: 4985.09 },
        styles: {
          offset: [0, 0],
          position: 'bottom',
          symbol: {
            type: 'diamond',
            size: 8,
            color: '#1e88e5',
            activeSize: 10,
            activeColor: '#FF9600',
          }
        },
        checkEventCoordinateOnCustomSymbol: function ({ eventCoordinate, coordinate, size }) {
          console.log(eventCoordinate, coordinate, size)
          return true
        },
        drawCustomSymbol: function ({ ctx, point, coordinate, viewport, isActive, styles }) {
          console.log(point, coordinate, viewport, isActive, styles)
        },
        drawExtend: function ({ ctx, point, coordinate, viewport, isActive, styles }) {
          console.log(point, coordinate, viewport, isActive, styles)
        },
        onClick: function ({ id, event }) { console.log(id, event) },
        onRightClick: function ({ id, event }) { console.log(id, event) },
        onMouseEnter: function ({ id, event }) { console.log(id, event) },
        onMouseLeave: function ({ id, event }) { console.log(id, event) },
      })
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		height: calc(100% - 80rpx);
	}
</style>
