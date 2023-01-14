import { DELETE_USER } from './mutations';
import { useMutation } from '@apollo/client';

function DeleteUserButton({_id}) {
    const [deleteUser, { data, loading, error }] = useMutation(DELETE_USER);

    const handleDelete = async () => {
        try {
            await deleteUser({ variables: { _id } });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <button onClick={handleDelete}>Delete User</button>
    );
}