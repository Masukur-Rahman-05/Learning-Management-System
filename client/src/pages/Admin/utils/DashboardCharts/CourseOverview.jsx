import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

export function CourseOverview({ courseData }) {
  // Define chart configuration
  const chartConfig = {
    students: {
      label: "Students",
      color: "hsl(var(--chart-1))",
    },
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-2))",
    },
  };

  // Ensure courseData is an array and has items
  const safeCourseData =
    Array.isArray(courseData) && courseData.length > 0 ? courseData : [];

  // Calculate total students and revenue
  const total = React.useMemo(
    () => ({
      students: safeCourseData.reduce(
        (acc, curr) => acc + (curr.students || 0),
        0
      ),
      revenue: safeCourseData.reduce(
        (acc, curr) => acc + (curr.revenue || 0),
        0
      ),
    }),
    [safeCourseData]
  );

  // Render nothing if no data
  if (safeCourseData.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          No course data available
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Course Performance Overview</CardTitle>
          <CardDescription>
            Showing students and revenue for each course
          </CardDescription>
        </div>
        <div className="flex">
          <div className="px-4 py-2">
            <span className="text-xs text-muted-foreground">
              Total Students
            </span>
            <div className="text-lg font-bold">
              {total.students.toLocaleString()}
            </div>
          </div>
          <div className="px-4 py-2">
            <span className="text-xs text-muted-foreground">Total Revenue</span>
            <div className="text-lg font-bold">
              ${total.revenue.toLocaleString()}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6 ">
        <ChartContainer
          config={chartConfig} // Add this line
          className="aspect-auto h-[350px] w-full"
        >
          <BarChart
            data={safeCourseData}
            margin={{
              left: 20,
              right: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="courseTitle"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
            />
            <YAxis
              yAxisId="students"
              label={{ value: "Students", angle: -90, position: "insideLeft" }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <YAxis
              yAxisId="revenue"
              orientation="right"
              label={{
                value: "Revenue ($)",
                angle: 90,
                position: "insideRight",
              }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              content={({ payload, label, active }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-4 border rounded shadow-lg">
                      <p className="font-bold">{label}</p>
                      {payload.map((entry) => (
                        <p key={entry.dataKey} style={{ color: entry.color }}>
                          {entry.dataKey === "students"
                            ? `Students: ${entry.value.toLocaleString()}`
                            : `Revenue: $${entry.value.toLocaleString()}`} 
                        </p>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="students"
              yAxisId="students"
              fill="#2d8112"
              barSize={20}
            />
            <Bar
              dataKey="revenue"
              yAxisId="revenue"
              fill="#740f86"
              barSize={20}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default CourseOverview;
