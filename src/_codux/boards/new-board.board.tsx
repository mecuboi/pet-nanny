import React from 'react'
import { createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'New Board',
    Board: () => <div>
        <h1>HELLO WORLD</h1>
        <img src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg" />
        <h3>Heading 3<p>This is a paragraph.<input type="file" />
        </p>
        </h3>
    </div>,
    environmentProps: {
        canvasWidth: 401,
        canvasHeight: 667,
        canvasBackgroundColor: '#cd8989'
    }
});
