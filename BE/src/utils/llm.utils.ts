export const verifyModel = (userSelectedModel: string, availableModels: string[]) => {
    if (!availableModels.includes(userSelectedModel)) return false;
    return true;
};