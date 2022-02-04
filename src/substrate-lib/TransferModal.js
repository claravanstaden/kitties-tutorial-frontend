import React from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import { TxButton } from './components'

const TransferModal = props => {
  const {
    kitty,
    accountPair,
    setStatus
  } = props
  const [open, setOpen] = React.useState(false)
  const [formValue, setFormValue] = React.useState({})

  const formChange = key => (ev, el) => {
    setFormValue({
      ...formValue,
      [key]: el.value
    })
  }

  const confirmAndClose = unsub => {
    console.log("confirm and close transfer")
    unsub()
    setOpen(false)
  }

  return <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}
                trigger={<Button basic color="blue" size='mini'>Transfer</Button>}>

    {/* The title of the modal */}
    <Modal.Header>Kitty Transfer</Modal.Header>

    <Modal.Content><Form>
      {/* The modal's inputs fields */}
      <Form.Input fluid label="Kitty ID" readOnly value={kitty.id}/>
      <Form.Input fluid label="Receiver" placeholder="Receiver Address" onChange={formChange('target')}/>
    </Form></Modal.Content>

    <Modal.Actions>
      {/* The cancel button */}
      <Button basic color="grey" onClick={() => setOpen(false)}>Cancel</Button>
      {/* The TxButton component */}
      <TxButton
        accountPair={accountPair} label="Transfer" type="SIGNED-TX" setStatus={setStatus}
        onClick={confirmAndClose}
        attrs={{
          palletRpc: 'substrateKitties',
          callable: 'transfer',
          inputParams: [formValue.target, kitty.id],
          paramFields: [true, true]
        }}
      />
    </Modal.Actions>
  </Modal>
}

export default TransferModal;
