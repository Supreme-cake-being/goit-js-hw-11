export const prevStuffDestroyer = (elementsToDelete) => {
    if (!elementsToDelete)
        return;

    for (const element of elementsToDelete)
        element.remove();
};