import React from 'react'
import {Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const UsersList = ({users}) => {
    return(
    <div>
        <h2>Users:</h2>
        <Table borderless size="sm">
            <thead>
                <tr>
                <th>User</th>
                <th>Blogs created</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user =>
                    <tr key={user.id}>
                        <td>
                            <Link to={`/users/${user.id}`}>{user.name}</Link>
                        </td>
                        <td>
                            {user.blogs.length}
                        </td>
                    </tr>
                    )}
            </tbody>
        </Table>
    </div>
    )
}

export default UsersList