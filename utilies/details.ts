import AsyncStorage from "@react-native-async-storage/async-storage";

export const generateRandomId = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomId += characters.charAt(randomIndex);
    }

    return randomId;
}

export const getUserEmail = async () => {
    try {
        const randomId = generateRandomId(10);
        await AsyncStorage.setItem('userEmail', "48w8TmtNKn");
        return randomId; // Return the generated email
    } catch (error) {
        return null; // Handle the error and return null or an appropriate value
    }
}