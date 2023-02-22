import {crimeDataStorage} from './crimeData.js';
crimeDataStorage();
const crimeData = JSON.parse(localStorage.getItem('items'));    

function displayGenChart(){
    const month =[];
    for(let d of crimeData){
        month.push((new Date(d.date)).getMonth()+1)
    }

    function countOccurrences(month) {
        const result = {};
        month.sort().forEach((key)=>result[key] = result[key] ? result[key] + 1 : 1);
        return result;
    }

    let monthData=Object.keys(countOccurrences(month));
    let monthDetail=Object.values(countOccurrences(month))

    let ctx = echarts.init(document.getElementById('myChart'));
    ctx.setOption({
        title: {
        text: 'Crime Trend in Greater Vancouver',
        
        left: 'center'
        },
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            data: monthDetail,
            type: 'line'
            }
        ]
        });
}



displayGenChart();

function displayGenPie(){
const type=[];
    for(let d of crimeData){
        type.push(d.type)
    }
    function countOccurrences(type) {
    const result = {};
    type.forEach((key)=>result[key] = result[key] ? result[key] + 1 : 1);
    return result;
    }
    console.log(countOccurrences(type))
    let typeData=Object.keys(countOccurrences(type));
    let typeNum=Object.values(countOccurrences(type))
    let newArray=[];
    for(let i=0;i<typeData.length;i++){
        newArray.push({value:typeNum[i],name:typeData[i]})
    }

    console.log(newArray)

    let myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
    title: {
        text: 'Crime Report in Greater Vancouver',
        subtext: 'Crime Type',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },

    series: [
        {
            name: 'Access From',
            type:'pie',
            avoidLabelOverlap: false,

            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: '{d}%',

                    textStyle : {                   
                    align : 'center',
                    baseline : 'middle',
                    fontFamily : '微软雅黑',
                    fontSize : 15,
                    fontWeight : 'bolder'
                    }
                },
            },
            data: newArray,
            emphasis: {
                itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        },
        }
    ]
    });
}
displayGenPie();

function displayGenBar(){
    const vancouver=['Vancouver'];
    const richmond=['Richmond'];
    const Surrey=['Surrey'];
    const northVancouver=['North Vancouver'];
    const Coquitlam=['Coquitlam'];
    const burnaby=['Burnaby'];
    const product=['product'];
    const vancouverCount = {};
    const richmondCount = {};
    const SurreyCount = {};
    const northVancouverCount = {};
    const CoquitlamCount = {};
    const burnabyCount = {};

    for(let d of crimeData){
        if(d.city=="Vancouver"){
            vancouverCount[d.type] = vancouverCount[d.type] ? vancouverCount[d.type] + 1 : 1;
        }else if(d.city=="Richmond"){
            richmondCount[d.type] = richmondCount[d.type] ? richmondCount[d.type] + 1 : 1;
            }else if(d.city=="Surrey"){
                SurreyCount[d.type] = SurreyCount[d.type] ? SurreyCount[d.type] + 1 : 1;
                }else if(d.city=="North Vancouver"){
                    northVancouverCount[d.type] = northVancouverCount[d.type] ? northVancouverCount[d.type] + 1 : 1;
                    }else if(d.city=="Coquitlam"){
                        CoquitlamCount[d.type] = CoquitlamCount[d.type] ? CoquitlamCount[d.type] + 1 : 1;
                        }else if(d.city=="Burnaby"){
                            burnabyCount[d.type] = burnabyCount[d.type] ? burnabyCount[d.type] + 1 : 1;
                        };
    }

    function objOrder(obj) {
        const ordered = {};
        Object.keys(obj).sort().forEach(function(key) {
            ordered[key] = obj[key];
        });
        return ordered;
    }   
        
    vancouver.push(...Object.values(objOrder(vancouverCount)));
    richmond.push(...Object.values(objOrder(richmondCount)));
    Surrey.push(...Object.values(objOrder(SurreyCount)));
    northVancouver.push(...Object.values(objOrder(northVancouverCount)));
    Coquitlam.push(...Object.values(objOrder(CoquitlamCount)));
    burnaby.push(...Object.values(objOrder(burnabyCount)));
    product.push(...Object.keys(objOrder(vancouverCount)));

    let myChart = echarts.init(document.getElementById('multi'));
    myChart.setOption({
        
    legend: {},
    tooltip: {},
    dataset: {
        source: [
        product,
            vancouver,
            richmond,
            Surrey,
            northVancouver,
            Coquitlam,
            burnaby
        ]
    },
    xAxis: { type: 'category',            
                axisLabel: {
                interval: 0,
                rotate: 40
            } },
    yAxis: {},
    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }, { type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
});
    
}
displayGenBar();

function displayCityCriem(){
    const city ={};
    for(let d of crimeData){
        city[d.city] = city[d.city] ? city[d.city] + 1 : 1;
    }
    console.log(city)
    const cityData=Object.keys(city);
    const cityDetail=Object.values(city)
    console.log(cityData)
    console.log(cityDetail)

    let ctx = echarts.init(document.getElementById('cityChart'));
    ctx.setOption({
        title: {
            text: 'Number of Crime by City',
            left: 'center'
        },
        xAxis: {
            type: 'category',
            data: cityData,
            axisLabel: {
                interval: 0,
                rotate: 40
            }
            
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            data: cityDetail,
            type: 'bar',
            
            itemStyle: {
                normal: {			
                    color: function (params) {
                        let colorList = [
                            '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                            '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                            '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                        ];
                        return colorList[params.dataIndex]
                    },
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: { //数值样式
										color: 'black',
										fontSize: 16
									}
                    }
                    
                    
                    }
                },
            
            }
        ]
    });
}

displayCityCriem();

function displayVanCrime(){
    let vancouver =[];
    for(let d of crimeData){
        if(d.city=="Vancouver"){
            vancouver.push(d)
        }
    }

    const month =[];
    for(let d of vancouver){
        month.push((new Date(d.date)).getMonth()+1)
    }

    function countOccurrences(month) {
        const result = {};
        month.sort().forEach((key)=>result[key] = result[key] ? result[key] + 1 : 1);
        console.log(result)
        return result;    
    }

    let monthDetail=Object.values(countOccurrences(month))
    let ctx = echarts.init(document.getElementById('myChart'));
    ctx.setOption({
        xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
        type: 'value'
        },
        series: [
        {
            data: monthDetail,
            type: 'line'
        }
        ]
        });

        }

        function displayRmdCrime(){
            let richmond =[];
            for(let d of crimeData){
                if(d.city=="Richmond"){
                    richmond.push(d)
            }
    }

    const month =[];
    for(let d of richmond){
        month.push((new Date(d.date)).getMonth()+1)
    }

    function countOccurrences(month) {
        const result = {};
        month.sort().forEach((key)=>result[key] = result[key] ? result[key] + 1 : 1);
        console.log(result)
        return result;    
    }
    let monthCity=Object.keys(countOccurrences(month))
    let monthDetail=Object.values(countOccurrences(month))
    let ctx = echarts.init(document.getElementById('myChart'));
    console.log(monthCity)
    ctx.setOption({
        xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
        type: 'value'
        },
        series: [
        {
            data: monthDetail,
            type: 'line'
        }
        ]
    });

}

function displayBurCrime(){
    let burnaby =[];
    for(let d of crimeData){
        if(d.city=="Burnaby"){
            burnaby.push(d)
    }
    }

    const month =[];
    for(let d of burnaby){
        month.push((new Date(d.date)).getMonth()+1)
    }

    function countOccurrences(month) {
        const result = {};
        month.sort().forEach((key)=>result[key] = result[key] ? result[key] + 1 : 1);
        console.log(result)
        return result;    
    }
    let monthCity=Object.keys(countOccurrences(month))
    let monthDetail=Object.values(countOccurrences(month))
    let ctx = echarts.init(document.getElementById('myChart'));
    console.log(monthCity)
    ctx.setOption({
        xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
        type: 'value'
        },
        series: [
        {
            data: monthDetail,
            type: 'line'
        }
        ]
    });

}

function displaySurCrime(){
    let surrey =[];
    for(let d of crimeData){
        if(d.city=="Surrey"){
            surrey.push(d)
        }
    }

    const month =[];
    for(let d of surrey){
        month.push((new Date(d.date)).getMonth()+1)
    }

    function countOccurrences(month) {
        const result = {};
        month.sort().forEach((key)=>result[key] = result[key] ? result[key] + 1 : 1);
        console.log(result)
        return result;    
    }
    let monthCity=Object.keys(countOccurrences(month))
    let monthDetail=Object.values(countOccurrences(month))
    let ctx = echarts.init(document.getElementById('myChart'));
    console.log(monthCity)
    ctx.setOption({
        xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
        type: 'value'
        },
        series: [
        {
            data: monthDetail,
            type: 'line'
        }
        ]
        });

}

function displayNVCrime(){
    let northVan =[];
    for(let d of crimeData){
        if(d.city=="North Vancouver"){
            northVan.push(d)
        }
    }

    const month =[];
    for(let d of northVan){
        month.push((new Date(d.date)).getMonth()+1)
    }

    function countOccurrences(month) {
        const result = {};
        month.sort().forEach((key)=>result[key] = result[key] ? result[key] + 1 : 1);
        console.log(result)
        return result;    
    }
    let monthCity=Object.keys(countOccurrences(month))
    let monthDetail=Object.values(countOccurrences(month))
    let ctx = echarts.init(document.getElementById('myChart'));
    console.log(monthCity)
    ctx.setOption({
        xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
        type: 'value'
        },
        series: [
        {
            data: monthDetail,
            type: 'line'
        }
        ]
    });

}

function displayCoqCrime(){
    let Coquitlam =[];
    for(let d of crimeData){
        if(d.city=="Coquitlam"){
            Coquitlam.push(d)
        }
    }

    const month =[];
    for(let d of Coquitlam){
        month.push((new Date(d.date)).getMonth()+1)
    }

    function countOccurrences(month) {
        const result = {};
        month.sort().forEach((key)=>result[key] = result[key] ? result[key] + 1 : 1);
        console.log(result)
        return result;    
    }
    let monthCity=Object.keys(countOccurrences(month))
    let monthDetail=Object.values(countOccurrences(month))
    let ctx = echarts.init(document.getElementById('myChart'));
    console.log(monthCity)
    ctx.setOption({
        xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
        type: 'value'
        },
        series: [
        {
            data: monthDetail,
            type: 'line'
        }
        ]
    });

}

document.getElementById("selection").addEventListener("change", show);
function show() {
if(document.getElementById("selection").value=="Vancouver"){
    displayVanCrime();
    }else if(document.getElementById("selection").value=="Richmond"){
        displayRmdCrime();
    }else if(document.getElementById("selection").value=="Burnaby"){
        displayBurCrime();
    }else if(document.getElementById("selection").value=="Surrey"){
        displaySurCrime();
    }else if(document.getElementById("selection").value=="North Vancouver"){
        displayNVCrime();
    }else if(document.getElementById("selection").value=="Coquitlam"){
        displayCoqCrime();
    }else if(document.getElementById("selection").value=="allCity"){
        displayGenChart();
    }
}
