async function scheduleHtmlProvider() {
    // 获取所有学期和对应的 value 值
    const semesterSelect = document.getElementById("drpSemester");
    const selectElement = document.getElementById("drpWeeks");
    const semester = Array.from(semesterSelect.options).map(option => option.text);
    const vz = Array.from(semesterSelect.options).map(option => option.value);
    const week = Array.from(selectElement.options).map(option => option.value);

    // 学期选择组件
    await loadTool('AIScheduleTools');
    const userSelect = await AIScheduleSelect({
        titleText: '学期',
        contentText: '请选择需要导入的学期',
        selectList: semester,
    });

    // 映射用户选择到 value 值
    const map = vz.reduce((acc, curr, index) => {
        acc[semester[index]] = curr;
        return acc;
    }, {});
    const trxq = map[userSelect] || "";

    let result = "";  // Initialize an empty string to hold the results

    // 循环 week 数组
    for (let i = 1; i < week.length; i++) {
        const everyweek = week[i];

        function getElementValue(selector) {
            const element = document.querySelector(selector);
            if (element) {
                return element.value;
            } else {
                console.error(`未找到元素: ${selector}`);
                return "";
            }
        }

        const response = await fetch("https://qdjw.gxsdxy.cn/StuClient/Tea/PKGL/KBCX/StuCourseSchedule.aspx", {
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                "__VIEWSTATE": getElementValue("#__VIEWSTATE"),
                "__VIEWSTATEGENERATOR": getElementValue("#__VIEWSTATEGENERATOR"),
                "__EVENTVALIDATION": getElementValue("#__EVENTVALIDATION"),
                "btnSearch": getElementValue("#btnSearch"),
                "drpSemester": trxq,
                "drpWeeks": everyweek,
            }).toString(),
            method: "POST",
            credentials: "include",
        });

        const text = await response.text();
        result += text;  // Append the response text to the result string
    }

    return result;  // Return the concatenated result string
}
