import { MDCFormField } from "@material/form-field";

class ContentUploader {
    private static status: number = 0;

    public static async uploadMedia(ev: MouseEvent): Promise<void> {
        if (this.status === 1) {
            return;
        }
        this.status = 1;
        const photoName: string = (document.getElementById("photo-name") as HTMLInputElement).value;
        const photoFileName: string = (document.getElementById("photo-file") as HTMLInputElement).value;

        console.log(photoFileName, photoName);

        this.status = 0;
    }
}

function init(): void {
    const formField: MDCFormField = new MDCFormField(document.querySelector(".mdc-form-field"));
    document.getElementById("add-photo-btn").addEventListener("click", ContentUploader.uploadMedia);
}

init();
