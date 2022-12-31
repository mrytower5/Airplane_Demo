import {
  Button,
  Stack,
  Table,
  Text,
  Title,
  TextInput,
  Card,
  useComponentState,
  Dialog,
  useTaskQuery,
} from "@airplane/views";
import { render } from "react-dom";

const Dashboard = () => {
  const searchKeyword = useComponentState("searchKeyword");
  const customersTable = useComponentState("customers");
  const selectedCustomer = customersTable.selectedRow;

  return (
    <Stack>
      <Title>Content Mod Panel</Title>
      <Text>
        Look up users with associated comments, deem whether it is approved or rejected.
      </Text>
      <Stack spacing="lg">
        <Table
          id="customers"
          title="Comments"
          columns={commentsCols}
          task={{
            slug: "get_comments",
            params: { search_keyword: searchKeyword.value },
            refetchInterval: 4000
          }}
          rowSelection="single"
          hiddenColumns={[]}
          defaultPageSize={5}
        />
        {selectedCustomer && (
          <CustomerCard
            selectedCustomer={selectedCustomer}
            searchKeyword={searchKeyword}
          />
        )}
      </Stack>
    </Stack>
  );
};

const CustomerCard = ({ selectedCustomer, searchKeyword }) => {
  const { close } = useComponentState("customers");
  // const { output, refetch } = useTaskQuery({ slug: "comments"}); 

  return (
    <Card>
      <Stack direction="row" justify="space-between">
        <div>
          <Title>Comment and Offenses</Title>
          <Text>
            Accept or Reject the comment (refresh if table above doesn't auto populate)
          </Text>
        </div>
        
        <Stack direction="row" spacing="sm">
        <Button  
            color="green"
            id="Approved"
            task={{ 
              slug: "update_status",
              params: {
                customer_id: selectedCustomer.customer_id,
                status: selectedCustomer.status,
              },
              
              refetchTasks: {
                slug: "comments", 
                params: { search_keyword: searchKeyword.value },
              }, 
              
              onSuccess: close,
            }}
            
            > APPROVE
          </Button>
          <Button
            color="red"
            id="Reject"
            task={{
              slug: "update_status_reject",
              params: {
                customer_id: selectedCustomer.customer_id,
                status: selectedCustomer.status,
              },
              refetchTasks: {
                slug: "comments", 
                params: { search_keyword: searchKeyword.value },
              },
              onSuccess: close, 
            }}
            
          > REJECT
          </Button>
        </Stack>
      </Stack>
      <Table
        title={`Comment From ${selectedCustomer.first_name} ${selectedCustomer.last_name}`}
        columns={ordersCols}
        task={{
          slug: "detailed_comments",
          params: { customer_id: selectedCustomer.customer_id },
        }}
        hiddenColumns={["customer_id", "username", "status"]}
        defaultPageSize={5}
      />
    </Card>
  );
};

const commentsCols = [
  { accessor: "customer_id", label: "Customer ID" },
  { accessor: "created_at", label: "Created" },
  { accessor: "email", label: "Email" },
  { accessor: "first_name", label: "First Name" },
  { accessor: "last_name", label: "Last Name" },
  { accessor: "comment", label: "Comment" },
  { accessor: "status", label: "Status" },
];

const ordersCols = [
  { accessor: "customer_id", label: "Customer ID" },
  { accessor: "username", label: "User" },
  { accessor: "comment", label: "Comment" },
  { accessor: "status", label: "Status", canEdit: true,},
  { accessor: "num_offenses", label: "Offenses" },
];

export default Dashboard;
