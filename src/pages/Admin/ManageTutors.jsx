import React from "react";
import Layout from "../../components/admin/Layout";
import PageInfo from "../../components/common/PageInfo";
import TableList from "../../components/admin/TableList";

export default function ManageTutors() {
    return (
      <Layout>
        <PageInfo admin pageName={"Manage Tutors"}/>
        <div className="flex flex-col gap-10">
          <TableList tutor />
        </div>
      </Layout>
    );
  }