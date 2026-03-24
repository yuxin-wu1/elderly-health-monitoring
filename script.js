// 全局变量
let behaviorChart;
let confidenceChart;
let healthTrendChart;
let updateInterval;

// 初始化函数
function init() {
    // 初始化侧边栏切换
    initSideNav();
    
    // 初始化时间显示
    updateTime();
    setInterval(updateTime, 1000);
    
    // 初始化行为趋势图表
    initBehaviorChart();
    
    // 初始化置信度趋势图表
    initConfidenceChart();
    
    // 初始化健康趋势图表
    initHealthTrendChart();
    
    // 初始化数据更新
    startDataUpdate();
    
    // 初始化弹窗功能
    initModals();
    
    // 初始化告警项点击事件
    initAlertItems();
    
    // 初始化数据看板点击事件
    initDashboardCards();
    
    // 初始化系统设置功能
    initSettings();
}

// 初始化侧边栏切换
function initSideNav() {
    const navItems = document.querySelectorAll('.nav-item');
    const modules = document.querySelectorAll('.module');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除所有导航项的active类
            navItems.forEach(nav => nav.classList.remove('active'));
            // 添加当前导航项的active类
            item.classList.add('active');
            
            // 隐藏所有模块
            modules.forEach(module => module.classList.remove('active'));
            // 显示对应模块
            const moduleId = item.dataset.module;
            document.getElementById(moduleId).classList.add('active');
            
            // 重新初始化图表，确保在模块切换后图表能正确显示
            setTimeout(() => {
                initBehaviorChart();
                initConfidenceChart();
                initHealthTrendChart();
            }, 100);
        });
    });
}

// 初始化系统设置功能
function initSettings() {
    // 设备在线状态切换
    if (document.getElementById('device-online')) {
        document.getElementById('device-online').addEventListener('change', function() {
            const statusDot = document.querySelector('.status-dot');
            const statusText = document.querySelector('.device-status span:last-child');
            if (this.checked) {
                statusDot.className = 'status-dot online';
                statusText.textContent = '设备在线';
            } else {
                statusDot.className = 'status-dot offline';
                statusText.textContent = '设备离线';
            }
        });
    }
    
    // 保存联系人信息
    if (document.getElementById('save-contacts')) {
        document.getElementById('save-contacts').addEventListener('click', function() {
            const name = document.getElementById('contact-name').value;
            const relation = document.getElementById('contact-relation').value;
            const phone = document.getElementById('contact-phone').value;
            alert(`联系人信息已保存：\n姓名：${name}\n关系：${relation}\n电话：${phone}`);
        });
    }
}

// 更新时间显示
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('current-time').textContent = timeString;
}

// 初始化行为趋势图表
function initBehaviorChart() {
    const ctx = document.getElementById('behaviorChart');
    if (ctx) {
        const ctx2d = ctx.getContext('2d');
        if (behaviorChart) {
            behaviorChart.destroy();
        }
        behaviorChart = new Chart(ctx2d, {
            type: 'line',
            data: {
                labels: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30'],
                datasets: [{
                    label: '行为活动',
                    data: [3, 5, 2, 4, 6, 3, 5, 4, 2, 3],
                    borderColor: '#1a73e8',
                    backgroundColor: 'rgba(26, 115, 232, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                            stepSize: 2
                        }
                    }
                }
            }
        });
    }
}

// 初始化置信度趋势图表
function initConfidenceChart() {
    const ctx = document.getElementById('confidenceChart');
    if (ctx) {
        const ctx2d = ctx.getContext('2d');
        if (confidenceChart) {
            confidenceChart.destroy();
        }
        confidenceChart = new Chart(ctx2d, {
            type: 'line',
            data: {
                labels: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30'],
                datasets: [{
                    label: '置信度',
                    data: [92, 95, 90, 93, 96, 94, 95, 97, 93, 95],
                    borderColor: '#34a853',
                    backgroundColor: 'rgba(52, 168, 83, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        min: 80,
                        max: 100,
                        ticks: {
                            stepSize: 5
                        }
                    }
                }
            }
        });
    }
}

// 初始化健康趋势图表
function initHealthTrendChart() {
    const ctx = document.getElementById('healthTrendChart');
    if (ctx) {
        const ctx2d = ctx.getContext('2d');
        if (healthTrendChart) {
            healthTrendChart.destroy();
        }
        healthTrendChart = new Chart(ctx2d, {
            type: 'line',
            data: {
                labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
                datasets: [
                    {
                        label: '心率',
                        data: [68, 65, 70, 75, 80, 78, 75, 72],
                        borderColor: '#ea4335',
                        tension: 0.4,
                        fill: false
                    },
                    {
                        label: '血氧',
                        data: [97, 96, 97, 98, 99, 98, 97, 98],
                        borderColor: '#34a853',
                        tension: 0.4,
                        fill: false
                    },
                    {
                        label: '体温',
                        data: [36.4, 36.3, 36.5, 36.6, 36.7, 36.6, 36.5, 36.4],
                        borderColor: '#fbbc05',
                        tension: 0.4,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        min: 30,
                        max: 100
                    }
                }
            }
        });
    }
}

// 开始数据更新
function startDataUpdate() {
    updateInterval = setInterval(() => {
        updateSensorData();
    }, 3000);
}

// 更新传感器数据
function updateSensorData() {
    const now = new Date();
    const timeString = now.toLocaleString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const dateTimeString = `${now.toLocaleDateString('zh-CN')} ${timeString}`;
    
    // 模拟行为数据
    const behaviors = ['行走', '站立', '坐下', '躺下', '静止'];
    const randomBehavior = behaviors[Math.floor(Math.random() * behaviors.length)];
    
    // 更新总览模块
    if (document.getElementById('latest-behavior')) {
        document.getElementById('latest-behavior').textContent = randomBehavior;
    }
    
    // 模拟状态数据
    const isNormal = Math.random() > 0.1; // 90%概率正常
    
    // 更新总览模块状态
    if (document.getElementById('current-status')) {
        const statusElement = document.getElementById('current-status');
        if (isNormal) {
            statusElement.textContent = '正常';
            statusElement.className = 'value status-normal';
        } else {
            statusElement.textContent = '异常';
            statusElement.className = 'value status-abnormal';
        }
    }
    
    // 模拟置信度
    const confidence = Math.floor(Math.random() * 10) + 90;
    
    // 更新总览模块置信度
    if (document.getElementById('confidence')) {
        document.getElementById('confidence').textContent = `${confidence}%`;
    }
    
    // 更新总览模块时间
    if (document.getElementById('status-time')) {
        document.getElementById('status-time').textContent = dateTimeString;
    }
    
    // 模拟健康数据
    const heartRate = Math.floor(Math.random() * 20) + 65;
    const systolic = Math.floor(Math.random() * 20) + 110;
    const diastolic = Math.floor(Math.random() * 10) + 75;
    const bloodOxygen = Math.floor(Math.random() * 3) + 97;
    const bodyTemperature = (Math.random() * 0.6 + 36.2).toFixed(1);
    
    // 更新总览模块健康数据
    if (document.getElementById('heart-rate')) {
        document.getElementById('heart-rate').textContent = heartRate;
    }
    if (document.getElementById('blood-pressure')) {
        document.getElementById('blood-pressure').textContent = `${systolic}/${diastolic}`;
    }
    if (document.getElementById('blood-oxygen')) {
        document.getElementById('blood-oxygen').textContent = bloodOxygen;
    }
    if (document.getElementById('body-temperature')) {
        document.getElementById('body-temperature').textContent = bodyTemperature;
    }
    
    // 更新健康数据模块
    if (document.getElementById('health-heart-rate')) {
        document.getElementById('health-heart-rate').textContent = heartRate;
    }
    if (document.getElementById('health-blood-pressure')) {
        document.getElementById('health-blood-pressure').textContent = `${systolic}/${diastolic}`;
    }
    if (document.getElementById('health-blood-oxygen')) {
        document.getElementById('health-blood-oxygen').textContent = bloodOxygen;
    }
    if (document.getElementById('health-body-temperature')) {
        document.getElementById('health-body-temperature').textContent = bodyTemperature;
    }
    
    // 更新健康状态和进度条
    updateHealthStatus(heartRate, systolic, diastolic, bloodOxygen, parseFloat(bodyTemperature));
    
    // 模拟设备数据
    const battery = Math.floor(Math.random() * 10) + 75;
    
    // 更新总览模块设备数据
    if (document.getElementById('battery-percent')) {
        document.getElementById('battery-percent').textContent = `${battery}%`;
    }
    if (document.getElementById('battery-level')) {
        document.getElementById('battery-level').style.width = `${battery}%`;
    }
    
    const signalStrength = Math.floor(Math.random() * 2) + 3;
    const signalDots = document.querySelectorAll('.signal-dot');
    signalDots.forEach((dot, index) => {
        if (index < signalStrength) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    // 模拟定位精度
    const locationAccuracy = Math.floor(Math.random() * 5) + 3;
    
    // 更新总览模块定位精度
    if (document.getElementById('location-accuracy')) {
        document.getElementById('location-accuracy').textContent = `${locationAccuracy}m`;
    }
    
    // 更新行为监测模块
    if (document.getElementById('current-behavior')) {
        document.getElementById('current-behavior').textContent = randomBehavior;
    }
    if (document.getElementById('behavior-status')) {
        const behaviorStatusElement = document.getElementById('behavior-status');
        if (isNormal) {
            behaviorStatusElement.textContent = '正常';
            behaviorStatusElement.className = 'value status-normal';
        } else {
            behaviorStatusElement.textContent = '异常';
            behaviorStatusElement.className = 'value status-abnormal';
        }
    }
    if (document.getElementById('behavior-confidence')) {
        document.getElementById('behavior-confidence').textContent = `${confidence}%`;
    }
    if (document.getElementById('behavior-time')) {
        document.getElementById('behavior-time').textContent = dateTimeString;
    }
    
    // 更新定位追踪模块
    if (document.getElementById('location-precision')) {
        document.getElementById('location-precision').textContent = `${locationAccuracy}m`;
    }
    if (document.getElementById('location-time')) {
        document.getElementById('location-time').textContent = dateTimeString;
    }
    
    // 更新行为趋势图表
    updateBehaviorChart();
    
    // 更新置信度趋势图表
    updateConfidenceChart();
    
    // 更新健康趋势图表
    updateHealthTrendChart();
    
    // 更新历史行为记录
    updateBehaviorHistory(randomBehavior, isNormal);
}

// 更新行为趋势图表
function updateBehaviorChart() {
    if (behaviorChart) {
        const newData = behaviorChart.data.datasets[0].data;
        newData.shift();
        newData.push(Math.floor(Math.random() * 8) + 1);
        behaviorChart.update();
    }
}

// 更新置信度趋势图表
function updateConfidenceChart() {
    if (confidenceChart) {
        const newData = confidenceChart.data.datasets[0].data;
        newData.shift();
        newData.push(Math.floor(Math.random() * 10) + 90);
        confidenceChart.update();
    }
}

// 更新健康趋势图表
function updateHealthTrendChart() {
    if (healthTrendChart) {
        // 更新心率数据
        const heartRateData = healthTrendChart.data.datasets[0].data;
        heartRateData.shift();
        heartRateData.push(Math.floor(Math.random() * 20) + 65);
        
        // 更新血氧数据
        const bloodOxygenData = healthTrendChart.data.datasets[1].data;
        bloodOxygenData.shift();
        bloodOxygenData.push(Math.floor(Math.random() * 3) + 97);
        
        // 更新体温数据
        const bodyTempData = healthTrendChart.data.datasets[2].data;
        bodyTempData.shift();
        bodyTempData.push(parseFloat((Math.random() * 0.6 + 36.2).toFixed(1)));
        
        healthTrendChart.update();
    }
}

// 更新健康状态和进度条
function updateHealthStatus(heartRate, systolic, diastolic, bloodOxygen, bodyTemperature) {
    // 更新心率状态
    if (document.getElementById('heart-rate-status')) {
        const heartRateStatus = document.getElementById('heart-rate-status');
        const heartRateProgress = document.getElementById('heart-rate-progress');
        if (heartRate > 100) {
            heartRateStatus.textContent = '偏高';
            heartRateStatus.className = 'health-status high';
        } else if (heartRate < 60) {
            heartRateStatus.textContent = '过低';
            heartRateStatus.className = 'health-status low';
        } else {
            heartRateStatus.textContent = '正常';
            heartRateStatus.className = 'health-status normal';
        }
        // 更新心率进度条
        if (heartRateProgress) {
            const progress = ((heartRate - 40) / (180 - 40)) * 100;
            heartRateProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        }
    }
    
    // 更新血压状态
    if (document.getElementById('blood-pressure-status')) {
        const bloodPressureStatus = document.getElementById('blood-pressure-status');
        const bloodPressureProgress = document.getElementById('blood-pressure-progress');
        if (systolic > 140 || diastolic > 90) {
            bloodPressureStatus.textContent = '偏高';
            bloodPressureStatus.className = 'health-status high';
        } else if (systolic < 90 || diastolic < 60) {
            bloodPressureStatus.textContent = '过低';
            bloodPressureStatus.className = 'health-status low';
        } else {
            bloodPressureStatus.textContent = '正常';
            bloodPressureStatus.className = 'health-status normal';
        }
        // 更新血压进度条
        if (bloodPressureProgress) {
            const progress = ((systolic - 90) / (200 - 90)) * 100;
            bloodPressureProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        }
    }
    
    // 更新血氧状态
    if (document.getElementById('blood-oxygen-status')) {
        const bloodOxygenStatus = document.getElementById('blood-oxygen-status');
        const bloodOxygenProgress = document.getElementById('blood-oxygen-progress');
        if (bloodOxygen < 95) {
            bloodOxygenStatus.textContent = '过低';
            bloodOxygenStatus.className = 'health-status low';
        } else {
            bloodOxygenStatus.textContent = '正常';
            bloodOxygenStatus.className = 'health-status normal';
        }
        // 更新血氧进度条
        if (bloodOxygenProgress) {
            bloodOxygenProgress.style.width = `${bloodOxygen}%`;
        }
    }
    
    // 更新体温状态
    if (document.getElementById('body-temperature-status')) {
        const bodyTemperatureStatus = document.getElementById('body-temperature-status');
        const bodyTemperatureProgress = document.getElementById('body-temperature-progress');
        if (bodyTemperature > 37.5) {
            bodyTemperatureStatus.textContent = '偏高';
            bodyTemperatureStatus.className = 'health-status high';
        } else if (bodyTemperature < 36.0) {
            bodyTemperatureStatus.textContent = '过低';
            bodyTemperatureStatus.className = 'health-status low';
        } else {
            bodyTemperatureStatus.textContent = '正常';
            bodyTemperatureStatus.className = 'health-status normal';
        }
        // 更新体温进度条
        if (bodyTemperatureProgress) {
            const progress = ((bodyTemperature - 36.0) / (42.0 - 36.0)) * 100;
            bodyTemperatureProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        }
    }
}

// 更新历史行为记录
function updateBehaviorHistory(behavior, isNormal) {
    if (document.getElementById('behavior-history')) {
        const historyBody = document.getElementById('behavior-history');
        const now = new Date();
        const timeString = now.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // 创建新的记录行
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${timeString}</td>
            <td>${behavior}</td>
            <td><span class="${isNormal ? 'status-normal' : 'status-abnormal'}">${isNormal ? '正常' : '异常'}</span></td>
        `;
        
        // 添加到表格顶部
        historyBody.insertBefore(newRow, historyBody.firstChild);
        
        // 保持只显示5条记录
        if (historyBody.children.length > 5) {
            historyBody.removeChild(historyBody.lastChild);
        }
    }
}

// 初始化弹窗功能
function initModals() {
    // 详情弹窗
    const detailModal = document.getElementById('detail-modal');
    const closeModal = document.getElementById('close-modal');
    const closeBtn = document.querySelector('.close-btn');
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            if (detailModal) {
                detailModal.classList.remove('active');
            }
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (detailModal) {
                detailModal.classList.remove('active');
            }
        });
    }
    
    // 点击弹窗外部关闭
    if (detailModal) {
        detailModal.addEventListener('click', (e) => {
            if (e.target === detailModal) {
                detailModal.classList.remove('active');
            }
        });
    }
    
    // 紧急呼叫弹窗
    const emergencyModal = document.getElementById('emergency-modal');
    const emergencyBtn = document.querySelector('.emergency-btn');
    const cancelEmergency = document.getElementById('cancel-emergency');
    const confirmEmergency = document.getElementById('confirm-emergency');
    const emergencyCloseBtn = emergencyModal ? emergencyModal.querySelector('.close-btn') : null;
    
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', () => {
            if (emergencyModal) {
                emergencyModal.classList.add('active');
            }
        });
    }
    
    if (cancelEmergency) {
        cancelEmergency.addEventListener('click', () => {
            if (emergencyModal) {
                emergencyModal.classList.remove('active');
            }
        });
    }
    
    if (confirmEmergency) {
        confirmEmergency.addEventListener('click', () => {
            alert('紧急呼叫已发送！');
            if (emergencyModal) {
                emergencyModal.classList.remove('active');
            }
        });
    }
    
    if (emergencyCloseBtn) {
        emergencyCloseBtn.addEventListener('click', () => {
            if (emergencyModal) {
                emergencyModal.classList.remove('active');
            }
        });
    }
    
    // 点击弹窗外部关闭
    if (emergencyModal) {
        emergencyModal.addEventListener('click', (e) => {
            if (e.target === emergencyModal) {
                emergencyModal.classList.remove('active');
            }
        });
    }
}

// 初始化告警项点击事件
function initAlertItems() {
    const alertItems = document.querySelectorAll('.alert-item');
    
    alertItems.forEach(item => {
        item.addEventListener('click', () => {
            const details = item.querySelector('.alert-details');
            if (details) {
                if (details.style.display === 'none') {
                    details.style.display = 'block';
                } else {
                    details.style.display = 'none';
                }
            }
        });
    });
}

// 初始化数据看板点击事件
function initDashboardCards() {
    const behaviorTrendCard = document.getElementById('behavior-trend');
    const healthMetricsCard = document.getElementById('health-metrics');
    const deviceStatusCard = document.getElementById('device-status');
    const detailModal = document.getElementById('detail-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    // 行为趋势卡片点击
    if (behaviorTrendCard) {
        behaviorTrendCard.addEventListener('click', () => {
            if (modalTitle) {
                modalTitle.textContent = '行为趋势详情';
            }
            if (modalBody) {
                modalBody.innerHTML = `
                    <div style="height: 300px;">
                        <canvas id="detailBehaviorChart"></canvas>
                    </div>
                    <p style="margin-top: 1rem;">最近24小时行为活动记录：</p>
                    <ul style="list-style: none; padding: 0;">
                        <li>10:00 - 行走</li>
                        <li>10:30 - 站立</li>
                        <li>11:00 - 坐下</li>
                        <li>11:30 - 行走</li>
                        <li>12:00 - 坐下</li>
                        <li>12:30 - 躺下</li>
                        <li>13:00 - 行走</li>
                        <li>13:30 - 站立</li>
                        <li>14:00 - 坐下</li>
                        <li>14:30 - 行走</li>
                    </ul>
                `;
            }
            if (detailModal) {
                detailModal.classList.add('active');
            }
            
            // 延迟初始化图表，确保DOM已渲染
            setTimeout(() => {
                const ctx = document.getElementById('detailBehaviorChart');
                if (ctx) {
                    const ctx2d = ctx.getContext('2d');
                    new Chart(ctx2d, {
                        type: 'line',
                        data: {
                            labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
                            datasets: [{
                                label: '行为活动',
                                data: [2, 1, 3, 5, 4, 6, 3, 2],
                                borderColor: '#1a73e8',
                                backgroundColor: 'rgba(26, 115, 232, 0.1)',
                                tension: 0.4,
                                fill: true
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false
                        }
                    });
                }
            }, 100);
        });
    }
    
    // 健康指标卡片点击
    if (healthMetricsCard) {
        healthMetricsCard.addEventListener('click', () => {
            if (modalTitle) {
                modalTitle.textContent = '健康指标详情';
            }
            if (modalBody) {
                modalBody.innerHTML = `
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
                        <div style="background-color: #f8f9fa; padding: 1rem; border-radius: 8px;">
                            <h4 style="margin-bottom: 0.5rem; color: #1a73e8;">心率趋势</h4>
                            <div style="height: 150px;"><canvas id="heartRateChart"></canvas></div>
                        </div>
                        <div style="background-color: #f8f9fa; padding: 1rem; border-radius: 8px;">
                            <h4 style="margin-bottom: 0.5rem; color: #1a73e8;">血压趋势</h4>
                            <div style="height: 150px;"><canvas id="bloodPressureChart"></canvas></div>
                        </div>
                        <div style="background-color: #f8f9fa; padding: 1rem; border-radius: 8px;">
                            <h4 style="margin-bottom: 0.5rem; color: #1a73e8;">血氧趋势</h4>
                            <div style="height: 150px;"><canvas id="bloodOxygenChart"></canvas></div>
                        </div>
                        <div style="background-color: #f8f9fa; padding: 1rem; border-radius: 8px;">
                            <h4 style="margin-bottom: 0.5rem; color: #1a73e8;">体温趋势</h4>
                            <div style="height: 150px;"><canvas id="bodyTempChart"></canvas></div>
                        </div>
                    </div>
                    <p style="font-weight: 500;">健康状态评估：</p>
                    <p>所有指标均在正常范围内，健康状态良好。</p>
                `;
            }
            if (detailModal) {
                detailModal.classList.add('active');
            }
            
            // 延迟初始化图表
            setTimeout(() => {
                // 心率图表
                const heartRateCtx = document.getElementById('heartRateChart');
                if (heartRateCtx) {
                    const heartRateCtx2d = heartRateCtx.getContext('2d');
                    new Chart(heartRateCtx2d, {
                        type: 'line',
                        data: {
                            labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
                            datasets: [{
                                label: '心率',
                                data: [72, 75, 78, 74, 76, 75],
                                borderColor: '#ea4335',
                                tension: 0.4,
                                fill: false
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    min: 60,
                                    max: 90
                                }
                            }
                        }
                    });
                }
                
                // 血压图表
                const bloodPressureCtx = document.getElementById('bloodPressureChart');
                if (bloodPressureCtx) {
                    const bloodPressureCtx2d = bloodPressureCtx.getContext('2d');
                    new Chart(bloodPressureCtx2d, {
                        type: 'line',
                        data: {
                            labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
                            datasets: [
                                {
                                    label: '收缩压',
                                    data: [120, 122, 118, 121, 119, 120],
                                    borderColor: '#1a73e8',
                                    tension: 0.4,
                                    fill: false
                                },
                                {
                                    label: '舒张压',
                                    data: [80, 81, 79, 80, 78, 80],
                                    borderColor: '#34a853',
                                    tension: 0.4,
                                    fill: false
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    min: 60,
                                    max: 140
                                }
                            }
                        }
                    });
                }
                
                // 血氧图表
                const bloodOxygenCtx = document.getElementById('bloodOxygenChart');
                if (bloodOxygenCtx) {
                    const bloodOxygenCtx2d = bloodOxygenCtx.getContext('2d');
                    new Chart(bloodOxygenCtx2d, {
                        type: 'line',
                        data: {
                            labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
                            datasets: [{
                                label: '血氧',
                                data: [98, 99, 98, 97, 98, 99],
                                borderColor: '#34a853',
                                tension: 0.4,
                                fill: false
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    min: 90,
                                    max: 100
                                }
                            }
                        }
                    });
                }
                
                // 体温图表
                const bodyTempCtx = document.getElementById('bodyTempChart');
                if (bodyTempCtx) {
                    const bodyTempCtx2d = bodyTempCtx.getContext('2d');
                    new Chart(bodyTempCtx2d, {
                        type: 'line',
                        data: {
                            labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
                            datasets: [{
                                label: '体温',
                                data: [36.5, 36.6, 36.7, 36.6, 36.5, 36.6],
                                borderColor: '#fbbc05',
                                tension: 0.4,
                                fill: false
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    min: 36,
                                    max: 37
                                }
                            }
                        }
                    });
                }
            }, 100);
        });
    }
    
    // 设备状态卡片点击
    if (deviceStatusCard) {
        deviceStatusCard.addEventListener('click', () => {
            if (modalTitle) {
                modalTitle.textContent = '设备状态详情';
            }
            if (modalBody) {
                modalBody.innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <div style="background-color: #f8f9fa; padding: 1rem; border-radius: 8px;">
                            <h4 style="margin-bottom: 0.5rem; color: #1a73e8;">设备信息</h4>
                            <p><strong>设备ID：</strong>DEV-20240115-001</p>
                            <p><strong>设备类型：</strong>智能健康监测手表</p>
                            <p><strong>固件版本：</strong>v1.2.3</p>
                            <p><strong>上次同步：</strong>${new Date().toLocaleString('zh-CN')}</p>
                        </div>
                        <div style="background-color: #f8f9fa; padding: 1rem; border-radius: 8px;">
                            <h4 style="margin-bottom: 0.5rem; color: #1a73e8;">设备日志</h4>
                            <ul style="list-style: none; padding: 0;">
                                <li>14:30: 设备在线</li>
                                <li>14:15: 数据同步成功</li>
                                <li>14:00: 设备充电中</li>
                                <li>13:30: 定位更新</li>
                                <li>13:00: 固件检查</li>
                            </ul>
                        </div>
                        <div style="background-color: #f8f9fa; padding: 1rem; border-radius: 8px;">
                            <h4 style="margin-bottom: 0.5rem; color: #1a73e8;">网络状态</h4>
                            <p><strong>网络类型：</strong>4G</p>
                            <p><strong>信号强度：</strong>良好</p>
                            <p><strong>数据流量：</strong>1.2MB/天</p>
                        </div>
                    </div>
                `;
            }
            if (detailModal) {
                detailModal.classList.add('active');
            }
        });
    }
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);

// 页面卸载时清除定时器
window.addEventListener('unload', () => {
    if (updateInterval) {
        clearInterval(updateInterval);
    }
});