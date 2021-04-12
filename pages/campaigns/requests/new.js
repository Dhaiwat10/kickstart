import Layout from '../../../components/layout';
import web3 from '../../../ethereum/web3';
import Campaign from '../../../ethereum/campaign';
import { Link, Router } from '../../../routes';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import { useState } from 'react';

const Index = ({ address }) => {
  const [desc, setDesc] = useState('');
  const [value, setValue] = useState('');
  const [recepient, setRecepient] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const campaign = Campaign(address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(desc, web3.utils.toWei(value, 'ether'), recepient)
        .send({
          from: accounts[0],
        });
      setLoading(false);
      setSuccess(true);
      Router.pushRoute(`/campaigns/${address}`);
    } catch (err) {
      console.log(err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Link route={`/campaigns/${address}`}>
        <a>Back</a>
      </Link>
      <h3>Create a request</h3>
      <Form onSubmit={onSubmit} success={success} error={!!error}>
        <Form.Field>
          <label>Description</label>
          <Input
            disabled={loading}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in ether</label>
          <Input
            disabled={loading}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Recepient address</label>
          <Input
            disabled={loading}
            value={recepient}
            onChange={(e) => setRecepient(e.target.value)}
          />
        </Form.Field>
        <Message error content={error} />
        <Message success content="Successfully created the request." />
        <Button loading={loading} primary>
          Create
        </Button>
      </Form>
    </Layout>
  );
};

Index.getInitialProps = async (ctx) => {
  const { address } = ctx.query;
  return { address };
};

export default Index;
