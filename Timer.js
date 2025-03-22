/**
 * 时间配置函数，此为入口函数，不要改动函数名
 */
async function scheduleTimer({
  providerRes,
  parserRes
} = {}) {
  // 支持异步操作 推荐await写法

  // 解析出课程信息
  const parsedSchedule = parserRes;

  // 设定时间配置，首先初始化一些基本配置
  const totalWeek = 20;  // 假设是20周的课程
  const startSemester = Date.now().toString();  // 使用当前时间戳作为开学时间戳
  const startWithSunday = false;  // 默认不以周日为起始日
  const showWeekend = false;  // 默认不显示周末
  const forenoon = 4;  
  const afternoon = 4; 
  const night = 2;  

  // 定义作息时间表（节次与时间）
  const sections = [
    { section: 1, startTime: '08:40', endTime: '09:25' },  // 第一节课
    { section: 2, startTime: '09:25', endTime: '10:05' },  // 第二节课
    { section: 3, startTime: '10:20', endTime: '11:00' },  // 第三节课
    { section: 4, startTime: '11:05', endTime: '11:45' },  // 第四节课
    { section: 5, startTime: '14:30', endTime: '15:10' },  // 第五节课
    { section: 6, startTime: '15:15', endTime: '15:55' },  // 第六节课
    { section: 7, startTime: '16:10', endTime: '16:50' },  // 第七节课
    { section: 8, startTime: '16:55', endTime: '17:35' },  // 第八节课
    { section: 9, startTime: '19:30', endTime: '20:10' },  // 第九节课
    { section: 10, startTime: '20:15', endTime: '20:55' }, // 第十节课
  ];

  // 返回时间配置JSON
  return {
    totalWeek: totalWeek,  // 总周数
    startSemester: startSemester,  // 开学时间戳
    startWithSunday: startWithSunday,  // 是否从周日开始
    showWeekend: showWeekend,  // 是否显示周末
    forenoon: forenoon,  // 上午课程节数
    afternoon: afternoon,  // 下午课程节数
    night: night,  // 晚间课程节数
    sections: sections,  // 课程时间表
  }
}
