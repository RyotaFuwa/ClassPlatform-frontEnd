import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {USER_TYPE} from "../../../consts";


const UserCol = styled.div`
  margin: 0.1em 0;
  display: grid;
  grid-template-columns: 2fr 3fr 1fr;
  text-align: center;
`

const UserList = ({users, handleChange}) => {

  return (
    <div>
      <UserCol key={0}>
        <div className='font-weight-bold'>Name</div>
        <div className='font-weight-bold'>Email</div>
        <div className='font-weight-bold'>User Type</div>
      </UserCol>
      <div className='border-bottom' />
      {users.map((each, idx) =>
        <UserCol key={idx}>
          <div>{each.displayName}</div>
          <div>{each.email}</div>
          <TextField
            select
            value={each.userType}
            onChange={e => handleChange(idx, {userType: e.target.value})}
          >
            {USER_TYPE.map(each =>
              <MenuItem key={each} value={each}>
                {each}
              </MenuItem>
            )}
          </TextField>
        </UserCol>
      )}
    </div>
  )
}

export default UserList;