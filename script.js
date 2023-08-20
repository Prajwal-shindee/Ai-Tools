const toolsData = [];

const categories = ["Image AI", "Video AI", "Text AI", "Editing AI", "Code AI"];

function populateToolCards(tools) {
    const toolsContainer = document.getElementById('toolsContainer');
    toolsContainer.innerHTML = '';

    tools.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.classList.add('tool-card');
        toolCard.innerHTML = `
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            <a href="${tool.link}" target="_blank">Learn More</a>
            <button class="delete-tool" data-tool-name="${tool.name}" data-category="${tool.category}">Delete</button>
        `;
        toolsContainer.appendChild(toolCard);
    });
}

function filterByCategory(category) {
    const filteredTools = toolsData.filter(tool => tool.category === category);
    populateToolCards(filteredTools);
}

function searchTools(query) {
    const filteredTools = toolsData.filter(tool =>
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.usage.toLowerCase().includes(query.toLowerCase())
    );
    populateToolCards(filteredTools);
}

document.getElementById('addToolForm').addEventListener('submit', event => {
    event.preventDefault();

    const toolName = document.getElementById('toolName').value;
    const toolUsage = document.getElementById('toolUsage').value;
    const toolLink = document.getElementById('toolLink').value;
    const toolCategory = document.getElementById('toolCategory').value;

    const newTool = {
        name: toolName,
        category: toolCategory,
        description: toolUsage,
        link: toolLink,
        usage: toolUsage,
    };

    toolsData.push(newTool);

    populateToolCards(toolsData);
    populateNavCategories(getUniqueCategories());
    populateCategoryDropdown(getUniqueCategories());

    document.getElementById('addToolForm').reset();
});

document.addEventListener('click', event => {
    if (event.target.classList.contains('delete-tool')) {
        const toolName = event.target.dataset.toolName;
        const category = event.target.dataset.category;
        deleteToolFromCategory(toolName, category);
    }
});

function deleteToolFromCategory(toolName, category) {
    const filteredTools = toolsData.filter(tool => !(tool.name === toolName && tool.category === category));
    toolsData.length = 0; // Clear the array
    toolsData.push(...filteredTools);
    populateToolCards(toolsData);
    populateNavCategories(getUniqueCategories());
    populateCategoryDropdown(getUniqueCategories());
}

function populateNavCategories(categories) {
    const navCategories = document.getElementById('navCategories');
    navCategories.innerHTML = '';

    categories.forEach(category => {
        const navCategoryItem = document.createElement('li');
        navCategoryItem.classList.add('category');
        navCategoryItem.textContent = category;
        navCategoryItem.addEventListener('click', () => {
            filterByCategory(category);
        });
        navCategories.appendChild(navCategoryItem);
    });
}

function populateCategoryDropdown(categories) {
    const toolCategoryDropdown = document.getElementById('toolCategory');
    toolCategoryDropdown.innerHTML = '<option value="" disabled selected>Select Category</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase().replace(" ", "-");
        option.textContent = category;
        toolCategoryDropdown.appendChild(option);
    });
}

function getUniqueCategories() {
    const categories = new Set();
    toolsData.forEach(tool => categories.add(tool.category));
    return Array.from(categories);
}

document.addEventListener('DOMContentLoaded', () => {
    const uniqueCategories = getUniqueCategories();
    populateNavCategories(uniqueCategories);
    populateCategoryDropdown(uniqueCategories);
});