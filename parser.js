const cheerio = require('cheerio');

function scheduleHtmlParser(html) {
  const $ = cheerio.load(html, {
    decodeEntities: false, // 禁用 HTML 实体转义
    xmlMode: true           // 启用 XML 模式
  });

  let result = [];
  // 查找所有课程的单元格
  let rows = $('.pkScheduleTime');

  rows.each(function () {
    let courseData = {
      name: "",
      position: "",
      teacher: "",
      weeks: [],
      day: 0,
      sections: []
    };

    // 提取课程名称（从 <td id="node_x_y"> 中提取课程名称，直到 <font style="color:#FF0000;"> 或 <br/> 前结束）
    let courseHtml = $(this).html();
    let courseName = courseHtml.split('<font style="color:#FF0000;">')[0].split('<br/>')[0].trim();  // 直到 <font> 或 <br/> 前结束

    // 去除类似 "(5)" 这样的文本
    courseName = courseName.replace(/\(\d+\)/, '').trim(); // 去除括号中的数字

    if (courseName && courseName !== '&nbsp;') {
      courseData.name = courseName;
    }

    // 提取教师名称（第一个 <span class="scheduleWeek"> 标签内）
    let teacher = $(this).find('span.scheduleWeek').first().text().trim();
    if (teacher && teacher !== '&nbsp;') {
      courseData.teacher = teacher;
    }

    // 提取上课地点（第二个 <span class="scheduleWeek"> 标签内）
    let position = $(this).find('span.scheduleWeek').eq(1).text().trim();
    if (position && position !== '&nbsp;') {
      courseData.position = position;
    }

    // 提取周数：向上查找最近的 <option selected="selected"> 标签，获取 value 值
    let weekSelector = $(this).parents().find('select[name="drpWeeks"] option[selected="selected"]');
    let week = weekSelector.attr('value');
    if (week) {
      courseData.weeks.push(parseInt(week));  // 提取周数
    }

    // 提取节次和周次
    let lessonText = $(this).text().trim();
    let sectionsMatch = lessonText.match(/(\d+)节/g);
    let weekMatch = lessonText.match(/\d+周/g);

    if (sectionsMatch) {
      courseData.sections = sectionsMatch.map(section => parseInt(section.replace("节", "")));
    }

    // 提取星期几和节次（从id属性中获取）
    let dayInfo = $(this).attr('id');
    if (dayInfo) {
      let dayMatch = dayInfo.match(/node_(\d)_(\d)/);
      if (dayMatch) {
        courseData.day = parseInt(dayMatch[1]);  // 提取星期几（1-7）
        courseData.sections.push(parseInt(dayMatch[2])); // 提取节次
        courseData.sections.push(parseInt(dayMatch[2])+1);
      }
    }

    result.push(courseData);
  });

  return result;
}
