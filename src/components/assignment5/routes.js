import React from "react";

function Routes(props) {
  const { projection, routes, selectedAirline } = props;
    console.log("Selected Airline ID in Routes component:", selectedAirline);

  // 1. 检查是否有选中的航空公司
  // 如果 `selectedAirlineID` 为 `null`，即没有选中的航空公司，则返回空的 `<g></g>`
  if (selectedAirline === null) {
    return <g></g>;
  }

  // 2. 过滤出选中的航空公司的航线
  const selectedRoutes = routes.filter(
    (route) => route.AirlineID === selectedAirline
  );

  // 3. 绘制航线
  return (
    <g>
      {selectedRoutes.map((route, index) => {
        // 3.1 获取起点和终点的经纬度
        const sourceCoords = [route.SourceLongitude, route.SourceLatitude];
        const destCoords = [route.DestLongitude, route.DestLatitude];

        // 3.2 使用投影函数将经纬度转换为屏幕上的平面坐标
        const [x1, y1] = projection(sourceCoords);
        const [x2, y2] = projection(destCoords);

        // 输出坐标信息，方便调试
        //console.log(`Route ${index}: Source (${x1}, ${y1}), Destination (${x2}, ${y2})`);

        // 3.3 检查坐标是否有效，如果有效，则绘制航线
        if (!isNaN(x1) && !isNaN(y1) && !isNaN(x2) && !isNaN(y2)) {
          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#992a5b" // 航线的颜色
              strokeWidth={0.5} // 航线的宽度
            />
          );
        }

        // 如果坐标无效，返回 `null`，不绘制航线
        return null;
      })}
    </g>
  );
}

export { Routes };
