import { Button, Card, Grid } from 'semantic-ui-react';
import ContributeForm from '../../components/ContributeForm';
import Layout from '../../components/layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

const Index = ({
  campaignAddress,
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  manager,
}) => {
  const renderCards = () => {
    const items = [
      {
        header: manager,
        meta: 'Address of the Manager',
        description:
          'The manager created this campaign and can create requests to withdraw money.',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: `${minimumContribution} wei`,
        meta: 'Minimum Contribution',
        description:
          'You must contribute at least this much wei to become an approver.',
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description:
          'A request tries to withdraw money from the contract. Requests must be approved by approvers.',
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description:
          'Number of people who have already donated to the campaign.',
      },
      {
        header: `${web3.utils.fromWei(balance, 'ether')} eth`,
        meta: 'Campaign Balance',
        description:
          'The balance is how much money this campaign has left to spend.',
      },
    ];

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{renderCards()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm campaignAddress={campaignAddress} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link route={`/campaigns/${campaignAddress}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

Index.getInitialProps = async (ctx) => {
  const campaign = Campaign(ctx.query.address);
  const summary = await campaign.methods.getSummary().call();

  return {
    campaignAddress: ctx.query.address,
    minimumContribution: summary['0'],
    balance: summary['1'],
    requestsCount: summary['2'],
    approversCount: summary['3'],
    manager: summary['4'],
  };
};

export default Index;
