import React from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import { TxButton } from './components'

const BreedModal = props => {
  const { kitty, accountPair, setStatus } = props;
  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = React.useState({});

  const formChange = key => (ev, el) => {
    setFormValue({ ...formValue, [key]: el.value });
  };

  const confirmAndClose = (unsub) => {
    setOpen(false);
    if (unsub && typeof unsub === 'function') unsub();
  };

  return <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}
                trigger={<Button basic color='blue' size='mini'>Breed</Button>}>

    {/* The title of the modal */}
    <Modal.Header>Kitty Set Price</Modal.Header>

    <Modal.Content><Form>
      {/* The modal's inputs fields */}
      <Form.Input fluid label='Kitty ID' readOnly value={kitty.id}/>
      <Form.Input fluid label='With' placeholder='Kitty ID' onChange={formChange('target')}/>
    </Form></Modal.Content>

    <Modal.Actions>
      {/* The cancel button */}
      <Button basic color='grey' onClick={() => setOpen(false)}>Cancel</Button>
      {/* The TxButton component */}
      <TxButton
        accountPair={accountPair} label='Breed!' type='SIGNED-TX' setStatus={setStatus}
        onClick={confirmAndClose}
        attrs={{
          palletRpc: 'substrateKitties',
          callable: 'breedKitty',
          inputParams: [kitty.id, formValue.target],
          paramFields: [true, true]
        }}
      />
    </Modal.Actions>
  </Modal>;
};

export default BreedModal;
