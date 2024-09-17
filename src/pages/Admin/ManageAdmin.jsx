import Layout from "../../components/admin/Layout";
import PageInfo from "../../components/common/PageInfo";
import AdminList from "../../components/admin/AdminList";

export default function ManageAdmin() {
    return (
      <Layout>
        <PageInfo admin pageName={"Manage Tutors"} />
        <div className="flex flex-col gap-10">
          <AdminList />
        </div>
      </Layout>
    );
  }