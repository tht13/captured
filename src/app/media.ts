class ContentUploader {
    private static status: number = 0;

    private static readFile(blob: Blob): Promise<string> {
        return new Promise((res, rej) => {
            const fl: FileReader = new FileReader();
            fl.onloadend = ev => res(fl.result);
            fl.onerror = ev => rej(fl.error);
            fl.readAsDataURL(blob);
        });
    }

    public static async uploadMedia(ev: MouseEvent): Promise<void> {
        if (this.status === 1) {
            return;
        }
        try {
            ContentUploader.status = 1;
            const photoName: string = (document.getElementById("photo-name") as HTMLInputElement).value;
            const fileSelector: HTMLInputElement = document.getElementById("photo-file") as HTMLInputElement;
            const photoFileName: string = fileSelector.value;
            const file: string = await ContentUploader.readFile(fileSelector.files[0]);
            const result: Response = await fetch("/media",
                {
                    headers: [["Content-Type", "application/json"]],
                    method: "POST",
                    body: JSON.stringify({ name: photoName, photo: file, desc: "" })
                });
        } catch (e) {
            console.log(e);
        }
        ContentUploader.status = 0;
        window.location.reload();
    }

    public static async deleteItem(id: string): Promise<void> {
        if (this.status === 1) {
            return;
        }
        try {
            ContentUploader.status = 1;
            await fetch(`/media/${id}`, { method: "DELETE" });
        } catch(e) {
            console.log(e);
        }

        ContentUploader.status = 0;
        window.location.reload();
    }
}

function init(): void {
    document.getElementById("add-photo-btn").addEventListener("click", ContentUploader.uploadMedia);
    const deleteButtons: HTMLCollectionOf<Element> = document.getElementsByClassName("img-delete");
    for (let i: number = 0; i< deleteButtons.length; i++) {
        deleteButtons.item(i).addEventListener("click", () => ContentUploader.deleteItem(deleteButtons.item(i).getAttribute("data-img")));
    }
}

init();
