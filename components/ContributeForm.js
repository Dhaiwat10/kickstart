import { useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

const ContributeForm = ({ campaignAddress }) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const campaign = Campaign(campaignAddress);
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether'),
      });
      setLoading(false);
      setSuccess(true);

      Router.replaceRoute(`/campaigns/${campaignAddress}`);
    } catch (error) {
      setErrorMessage(error.message);
      console.log();
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit} success={success} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          disabled={loading}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label="ether"
          labelPosition="right"
        />
      </Form.Field>
      <Message error content={errorMessage} />
      {success && (
        <Message success content="Successfully contributed to the campaign." />
      )}
      <Button loading={loading} primary>
        Contribute!
      </Button>
    </Form>
  );
};

export default ContributeForm;
