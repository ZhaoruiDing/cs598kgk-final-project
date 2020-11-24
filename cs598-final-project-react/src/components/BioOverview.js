import React from 'react'
import { Icon, Item } from 'semantic-ui-react'

const BioOverview = () => (
  <Item.Group>
    <Item>
      <Item.Image size='tiny' src='https://i.pravatar.cc/300' />

      <Item.Content>
        <Item.Header as='a'>Zhang Zhe</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>
          The elder, Honor Professor, Former Chairman
        </Item.Description>
        <Item.Extra>
        <Icon color='green' name='check' /> 121 Votes
        </Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>
)

export default BioOverview
