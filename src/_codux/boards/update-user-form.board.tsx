import React from 'react'
import { createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'UpdateUserForm',
    Board: () => <div>
        <h1>Heading 1</h1>
    </div>,
    environmentProps: {
        canvasHeight: 663,
        canvasWidth: 144
    }
});
