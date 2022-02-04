import React from 'react'
import {
  Button,
  Card,
  Grid,
  Message,
  Modal,
  Form,
  Label
} from 'semantic-ui-react'

import KittyAvatar from './KittyAvatar'
import SetPriceModal from './substrate-lib/SetPriceModal'
import TransferModal from './substrate-lib/TransferModal'

// Use props
const KittyCard = props => {
  const {
    kitty,
    accountPair,
    setStatus
  } = props
  const {
    id = null,
    dna = null,
    owner = null,
    gender = null,
    price = null
  } = kitty
  const displayDna = dna && dna.toJSON()
  const isSelf = accountPair.address === kitty.owner

  return <Card>
    {isSelf && <Label as="a" floating color="teal">Mine</Label>}
    {/* Render the Kitty Avatar */}
    <KittyAvatar dna={dna.toU8a()}/>
    <Card.Content>
      {/* Display the Kitty ID */}
      <Card.Header style={{
        fontSize: '1em',
        overflowWrap: 'break-word'
      }}>
        ID: {id}
      </Card.Header>
      {/* Display the Kitty DNA */}
      <Card.Meta style={{
        fontSize: '.9em',
        overflowWrap: 'break-word'
      }}>
        DNA: {displayDna}
      </Card.Meta>
      {/* Display the Kitty ID, Gender, Owner and Price */}
      <Card.Description>
        <p style={{ overflowWrap: 'break-word' }}>
          Gender: {gender}
        </p>
        <p style={{ overflowWrap: 'break-word' }}>
          Owner: {owner}
        </p>
        <p style={{ overflowWrap: 'break-word' }}>
          Price: {price}
        </p>
      </Card.Description>
    </Card.Content>
    {/* Render the transfer button using TransferModal */}
    {owner === accountPair.address && <Card.Content extra style={{ textAlign: 'center' }}>{
      <TransferModal kitty={kitty} accountPair={accountPair} setStatus={setStatus}/>
    }</Card.Content>}
    {owner === accountPair.address && <Card.Content extra style={{ textAlign: 'center' }}>
      <SetPriceModal kitty={kitty} accountPair={accountPair} setStatus={setStatus}/>
      </Card.Content>}
  </Card>
}

const KittyCards = props => {
  const {
    kitties,
    accountPair,
    setStatus
  } = props

  {
    /* Check the number of Kitties */
  }
  if (kitties.length === 0) {
    return (
      <Message info>
        <Message.Header>
          No Kitty found here... Create one now!&nbsp;
          <span role="img" aria-label="point-down">
            👇
          </span>
        </Message.Header>
      </Message>
    )
  }
  {
    /* Render Kitties using Kitty Card in a grid */
  }
  return (
    <Grid columns={3}>
      {kitties.map((kitty, i) => (
        <Grid.Column key={`kitty-${i}`}>
          <KittyCard
            kitty={kitty}
            accountPair={accountPair}
            setStatus={setStatus}
          />
        </Grid.Column>
      ))}
    </Grid>
  )
}

export default KittyCards
