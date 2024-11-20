import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TQueryParams } from "../../../types";
import { TAcademicSemester } from "../../../types/academicManagement.type";

export type TTable = Pick<
  TAcademicSemester,
  "name" | "startMonth" | "endMonth" | "year"
>;
export default function AcademicSemester() {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const { data: semesterData, isFetching } = useGetAllSemestersQuery(params);
  const tableData = semesterData?.data?.map(
    ({ _id, name, startMonth, endMonth, year }) => ({
      key: _id,
      name,
      startMonth,
      endMonth,
      year,
    })
  );

  const columns: TableColumnsType<TTable> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",

      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Fall",
          value: "Fall",
        },
        {
          text: "Summer",
          value: "Summer",
        },
      ],
    },
    {
      title: "Start Month",
      key: "startMonth",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      key: "endMonth",
      dataIndex: "endMonth",
    },
    {
      title: "Year",
      key: "year",
      dataIndex: "year",
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
      ],
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTable>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    console.log("params", { filters, extra });
    const queryParams: TQueryParams[] = [];
    if (extra.action === "filter") {
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );

      setParams(queryParams);
    }
  };

  // console.log(data);
  return (
    <Table<TTable>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
}
