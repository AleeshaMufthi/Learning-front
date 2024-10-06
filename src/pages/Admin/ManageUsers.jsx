import Layout from "../../components/admin/Layout";
import PageInfo from "../../components/common/PageInfo";
import TableList from "../../components/admin/TableList";

export default function ManageUsers() {
    return (
      <Layout>
        <PageInfo admin pageName={"Manage Users"}/>
        <div className="flex flex-col gap-10">
          <TableList />
        </div>
      </Layout>
    );
  }