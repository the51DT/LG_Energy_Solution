$(()=>{
    
    const ctx = document.getElementById('myChart').getContext("2d");
    var gradientStroke = ctx.createLinearGradient(0, 0, 0, 200);
    gradientStroke.addColorStop(0.5, "#C3C3C3");
    gradientStroke.addColorStop(0.9, "#fff");

    
    var gradientStroke2 = ctx.createLinearGradient(0, 0, 0, 200);
    gradientStroke2.addColorStop(0.5, "#B1A4FF");
    gradientStroke2.addColorStop(0.9, "#fff");

    Chart.register(ChartDataLabels);

    new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [
                {
                    type: 'line',
                    label: '급감속',
                    data: [10, 12, 7, 15, 12, 18],
                    backgroundColor: ['#9C9C9C', '#9C9C9C', '#9C9C9C', '#9C9C9C', '#9C9C9C', '#fff'],
                    borderColor: ['#9C9C9C', '#9C9C9C', '#9C9C9C', '#9C9C9C', '#9C9C9C', '#B1A4FF'],
                    borderWidth: 1,
                    pointStyle: ['circle', 'circle', 'circle', 'circle', 'circle', 'circle'],
                    pointRAdius: 10,
                    pointBorderWidth: [1, 1, 1, 1, 1, 3],
                    datalabels: {
                        align: 'top',
                        textAlign: 'start',
                        color: '#656565',
                        font: {
                            size: 10,
                        }
                    },
                },
                {
                    type: 'bar',
                    label: '급가속',
                    data: [31, 28, 23, 45, 30, 5],
                    barThickness: 20,
                    backgroundColor: [
                        gradientStroke,
                        gradientStroke,
                        gradientStroke,
                        gradientStroke,
                        gradientStroke,
                        gradientStroke2
                    ],
                    borderRadius: 9999,
                    datalabels: {
                        anchor: 'end',
                        align: 'end',
                        color: '#656565',
                        font: {
                            size: 10,
                        }
                    },
                    clip: false,
                }
            ],
            labels: ['12월', '1월', '2월', '3월', '4월', '당월']
        },
        datalabels: {
            color:'black',
            font:{size:24}
        },
        options: {
            // responsive: false,
            maintainAspectRatio: false,
            showTooltips: false,
            plugins:{
                datalabels: {
                    color: '#656565',
                },
                legend: {
                    display: false,
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font:{
                            size: 10,
                        },
                        color: '#bbb'
                    },
                },
                y: {
                    grid: {
                        color: "#E1E1E1",
                        tickLength: 0,
                    },
                    border: {
                        dash: [2,2],
                    },
                    ticks: {
                        stepSize: 16,
                        color: "transparent"
                    },
                },
            }
        }
    });
})



$(()=>{
    
    const ctx = document.getElementById('myChart2').getContext("2d");
    var gradientStroke = ctx.createLinearGradient(0, 0, 0, 200);
    gradientStroke.addColorStop(0.5, "#C3C3C3");
    gradientStroke.addColorStop(0.9, "#fff");

    
    var gradientStroke2 = ctx.createLinearGradient(0, 0, 0, 200);
    gradientStroke2.addColorStop(0.5, "#009AFE");
    gradientStroke2.addColorStop(0.9, "#fff");

    Chart.register(ChartDataLabels);

    let data = [2589, 1890, 2505, 1790, 2450, 1512];
    let newData = data.map((item, idx)=>{
        console.log('item', item);
        return (item * 0.1).toFixed(0);
    })

    new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [
                {
                    type: 'line',
                    label: '충전량',
                    data: newData,
                    backgroundColor: ['#9C9C9C', '#9C9C9C', '#9C9C9C', '#9C9C9C', '#9C9C9C', '#fff'],
                    borderColor: ['#9C9C9C', '#9C9C9C', '#9C9C9C', '#9C9C9C', '#9C9C9C', '#009AFE'],
                    borderWidth: 1,
                    pointStyle: ['circle', 'circle', 'circle', 'circle', 'circle', 'circle'],
                    pointRAdius: 10,
                    pointBorderWidth: [1, 1, 1, 1, 1, 3],
                    datalabels: {
                        value: [1,2,3,4,5,6],
                        align: 'top',
                        textAlign: 'start',
                        color: '#CDCDCD',
                        font: {
                            size: 10,
                        },
                        formatter: function (value, context) {
                            const result = data[context.dataIndex];
                            return result;
                        },
                    },
                },
                {
                    type: 'bar',
                    label: '급속횟수',
                    data: [55, 60, 61, 28, 62, 32],
                    barThickness: 20,
                    backgroundColor: [
                        gradientStroke,
                        gradientStroke,
                        gradientStroke,
                        gradientStroke,
                        gradientStroke,
                        gradientStroke2
                    ],
                    borderRadius: 9999,
                    datalabels: {
                        anchor: 'end',
                        align: 'bottom',
                        color: '#656565',
                        font: {
                            size: 10,
                        }
                    },
                    clip: false,
                },
                {
                    type: 'bar',
                    label: '총 충전횟수',
                    data: [57, 62, 70, 67, 72, 61],
                    barThickness: 20,
                    backgroundColor: '#E9E9E9',
                    borderRadius: 9999,
                    datalabels: {
                        anchor: 'end',
                        align: 'end',
                        color: '#656565',
                        font: {
                            size: 10,
                        }
                    },
                },
            ],
            
            labels: ['12월', '1월', '2월', '3월', '4월', '당월']
        },
        datalabels: {
            color:'black',
            font:{size:24}
        },
        options: {
            maintainAspectRatio: false,
            showTooltips: false,
            plugins:{
                datalabels: {
                    color: '#656565',
                },
                legend: {
                    display: false,
                },
                
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font:{
                            size: 10,
                        },
                        color: '#bbb'
                    },
                    stacked: true,
                },
                y: {
                    grid: {
                        color: "#E1E1E1",
                        tickLength: 0,
                    },
                    border: {
                        dash: [2,2],
                    },
                    ticks: {
                        stepSize: 16,
                        color: "transparent"
                    },
                    stacked: true,
                },
            }
        }
    });
})




    

$(()=>{
    _chartGuage.init();
    _chartBarHorizontal.init();
    _chartBarVertical.init();
    _chartBarVerticalDouble.init();
});

let _chartBarVerticalDouble = {
    data: [123456, 100000, 90000, 80000, 70000, 79311],
    maxData: 99999,
    
    data2: [18, 18, 25, 25, 28, 32],
    maxData2: 99999,

    label: ['12월', '1월', '2월', '3월', '4월', '당월'],

    frame: $(document).find(".chart_bar_vertical_double_wrap"),

    init: function(){
        this.setData();
    },
    setData: function(){

        _chartBarVerticalDouble.frame.find(".data_wrap").html('<ul class="data_ul"></ul>');
        const data_ul = _chartBarVerticalDouble.frame.find(".data_ul");

        this.maxData = Math.max.apply(null, this.data) + 5000; // get max data
        this.maxData2 = Math.max.apply(null, this.data2) + 10; // get max data

        this.data.map((item, idx)=>{

            const minItem = item + 2500;
            const per = ((minItem * 100) / this.maxData).toFixed(0);
            const comma = item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            
            const per2 = ((this.data2[idx] * 100) / this.maxData2).toFixed(0);

            let text = ( this.data.length-1 == idx ) ? `${comma}원` : `${comma}`;
            let text2 = this.data2[idx];

            let html = `
                <li>
                    <div class="label">${_chartBarVerticalDouble.label[idx]}</div>
                    <div class="graph">
                        <span class="guage" style="height:${per}%">
                            <span class="data">${text}</span>
                        </span>
                        <span class="guage2" style="height:${per2}%">
                            <span class="data">${text2}</span>
                        </span>
                    </div>
                </li>
            `;

            data_ul.append(html);
        })
    }
}

let _chartBarVertical = {
    data: [11211, 8910, 7899, 13540, 12002, 1563],
    label: ['12월', '1월', '2월', '3월', '4월', '당월'],
    maxData: 99999,

    frame: $(document).find(".chart_bar_vertical_wrap"),

    init: function(){
        this.setData();
    },
    setData: function(){

        _chartBarVertical.frame.find(".data_wrap").html('<ul class="data_ul"></ul>');
        const data_ul = _chartBarVertical.frame.find(".data_ul");

        this.maxData = Math.max.apply(null, this.data) + 5000; // get max data

        this.data.map((item, idx)=>{

            const minItem = item + 2500;
            const per = ((minItem * 100) / this.maxData).toFixed(0);
            const comma = item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            let text = ( this.data.length-1 == idx ) ? `${comma}Km` : `${comma}`;

            let html = `
                <li>
                    <div class="label">${_chartBarVertical.label[idx]}</div>
                    <div class="graph">
                        <span class="guage" style="height:${per}%">
                            <span class="data">${text}</span>
                        </span>
                    </div>
                </li>
            `;

            data_ul.append(html);
        })
    }
}

let _chartBarHorizontal = {
    data: [6.2, 6.0, 5.7, 7.0, 6.5, 6.7],
    label: ['12월', '1월', '2월', '3월', '4월', '당월'],

    frame: $(document).find(".chart_bar_horizontal_wrap"),

    init: function(){
        this.setData();
    },
    setData: function(){

        _chartBarHorizontal.frame.find(".data_wrap").html('<ul class="data_ul"></ul>');
        const data_ul = _chartBarHorizontal.frame.find(".data_ul");

        this.data.map((item, idx)=>{
            const per = item * 10;
            let text = ( this.data.length-1 == idx ) ? `${item.toFixed(1)}(km/kwh)` : `${item.toFixed(1)}`;

            let html = `
                <li>
                    <div class="label">${_chartBarHorizontal.label[idx]}</div>
                    <div class="graph">
                        <span class="guage" style="width:${per}%">
                            <span class="data">${text}</span>
                        </span>
                    </div>
                </li>
            `;

            data_ul.append(html);
        })
    }
    
}


let _chartGuage = {
    PreviousData: 70,   // 이전 데이터
    data: 72,   // 현재 데이터

    frame: $(document).find(".chart_guage_wrap .frame"),
    bar: $(document).find(".chart_guage_wrap .bar"),
    value: $(document).find(".chart_guage_wrap .value"),
    RADIUS: document.querySelector(".chart_guage_wrap .frame").getAttribute("r"),   // 100
    init: function(){

        let gauge = _chartGuage.gauge(100);                           // 반원
        let dasyarray = _chartGuage.dashArray();
        let dashoffset = dasyarray * (1-gauge);
        
        // frame
        _chartGuage.frame.css({ "stroke-dashoffset" : dashoffset });
        _chartGuage.frame.css({ "stroke-dasharray" : dasyarray });

        // bar
        _chartGuage.bar.css({ "stroke-dasharray" : dasyarray });

        _chartGuage.setData(_chartGuage.data);
    },
    gauge: function(per){
        return per / 100;                   // 원 (1)
    },
    dashArray: function(){                  //  점선 (고정값)
        return 2 * Math.PI * this.RADIUS;
    },
    dashOffset: function(per){              // 시작점 (animation)
        // let progress = per / 200;
        let gauge = _chartGuage.gauge(per);
        let dashoffset = _chartGuage.dashArray() * (1-gauge);

        return dashoffset;
    },
    discription: function(per){
        let text = '';
        if( _chartGuage.PreviousData > _chartGuage.data ){
            let num = _chartGuage.PreviousData - _chartGuage.data;
            text = `전월대비 <strong class="down">${num}점 하락 ▼</strong>`;
        } else if( _chartGuage.PreviousData < _chartGuage.data ) {
            let num = _chartGuage.data - _chartGuage.PreviousData;
            text = `전월대비 <strong class="up">${num}점 상승 ▲</strong>`;
        } else {
            text ='전월과 <strong>동일</strong>';
        }

        return text;
    },
    setData: function(per){
        let gauge = _chartGuage.gauge(per);   // 반원
        let dasyarray = _chartGuage.dashArray();
        let dashoffset = dasyarray * (1-gauge);

        _chartGuage.bar.css({ "stroke-dashoffset" : dashoffset });

        // data setting
        $(document).find(".chart_guage_wrap .value strong").html(_chartGuage.data);

        // discription setting
        let text = _chartGuage.discription();
        $(document).find(".chart_guage_wrap .info .txt").html(text);
    }
}