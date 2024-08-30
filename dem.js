document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.items');
    const tables = document.querySelectorAll('.table');

    
    items.forEach(itm => {
        itm.setAttribute('draggable', true);

        itm.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', itm.getAttribute('name'));
        });

        itm.addEventListener('click', () => {
            showMenuPopup(itm);
        });
        
    });

    // Handle table dragover, dragleave, and drop
    tables.forEach(table => {
        table.addEventListener('dragover', (e) => {
            e.preventDefault();
            table.classList.add('hovered');
        });

        table.addEventListener('dragleave', () => {
            table.classList.remove('hovered');
        });

        table.addEventListener('drop', (e) => {
            e.preventDefault();
            const itemName = e.dataTransfer.getData('text/plain');
            const draggedItem = Array.from(items).find(item => item.getAttribute('name').toLowerCase() === itemName.toLowerCase());
            if (draggedItem) {
                addToTable(table.id, draggedItem);
            }
            table.classList.remove('hovered');
        });

        // Show table details on click
        table.addEventListener('click', () => {
            showTableDetails(table.id);
        });
    });
});




function addToTable(tableId, item) {
    const table = document.getElementById(tableId);
    const itemPrice = parseInt(item.querySelector('span').textContent.split(' ')[1]);
    
    // Update the total price
    const totalElement = table.querySelector(`#total${tableId.replace('table', '')}`);
    const currentTotal = parseInt(totalElement.textContent);
    const newTotal = currentTotal + itemPrice;
    totalElement.textContent = newTotal;

    // Update the number of items
    const itemsElement = table.querySelector(`#nitems${tableId.replace('table', '')}`);
    const currentItems = parseInt(itemsElement.textContent);
    itemsElement.textContent = currentItems + 1;
}