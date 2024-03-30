export class ReadFile {

    readFile(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onerror = reject;
            fr.onload = () => {
                resolve(fr.result as string);
            }
            fr.readAsDataURL(file);
        });
    }

}