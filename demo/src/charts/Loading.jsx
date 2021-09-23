import React, { PureComponent } from 'react';
import ReactEcharts from '../../../src/index';

export default class Loading extends PureComponent {
  _t = null;
  getOption = () => {
    return {
      title: {
        text: '基础雷达图'
      },
      tooltip: {},
      legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
      },
      radar: {
        // shape: 'circle',
        indicator: [
           { name: '销售（sales）', max: 6500},
           { name: '管理（Administration）', max: 16000},
           { name: '信息技术（Information Techology）', max: 30000},
           { name: '客服（Customer Support）', max: 38000},
           { name: '研发（Development）', max: 52000},
           { name: '市场（Marketing）', max: 25000}
        ]
      },
      series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
          {
            value : [4300, 10000, 28000, 35000, 50000, 19000],
            name : '预算分配（Allocated Budget）'
          },
           {
            value : [5000, 14000, 28000, 31000, 42000, 21000],
            name : '实际开销（Actual Spending）'
          }
        ]
      }]
    };
  };
  onChartReady = (chart) => {
    this._t = setTimeout(function() {
      chart.hideLoading();
    }, 3000);
  };

  getLoadingOption = () => {
    return {
      text: '加载中...',
      color: '#4413c2',
      textColor: '#270240',
      maskColor: 'rgba(194, 88, 86, 0.3)',
      zlevel: 0
    };
  };

  componentWillUnmount() {
    clearTimeout(this._t);
  };

  render() {
    let code = "onChartReady: function(chart) {\n" +
           "  'chart.hideLoading();\n" +
           "}\n\n" +
           "<ReactEcharts \n" +
          "  option={this.getOption()} \n" +
          "  onChartReady={this.onChartReady} \n" +
          "  loadingOption={this.getLoadingOption()} \n" +
          "  showLoading={true} />";

    return (
      <div className='examples'>
        <div className='parent'>
          <label> Chart loading With <strong> showLoading </strong>: (when chart ready, hide the loading mask.)</label>
          <ReactEcharts
            option={this.getOption()}
            onChartReady={this.onChartReady}
            loadingOption={this.getLoadingOption()}
            showLoading={true} />
          <label> code below: </label>
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      </div>
    );
  }
}
