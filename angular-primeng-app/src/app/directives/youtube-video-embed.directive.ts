import { AfterViewInit, Directive, Renderer2, ElementRef } from "@angular/core";

@Directive({
	selector: "[youtubeVideoEmbed]",
	standalone: true,
})
export class YoutubeVideoEmbedDirective implements AfterViewInit {
	constructor(private el: ElementRef, private render2: Renderer2) {}

	ngAfterViewInit(): void {
		const embedWrappers: HTMLDivElement[] = Array.from(
			this.el.nativeElement.querySelectorAll(".embed-wrapper")
		);
		embedWrappers.forEach((embedWrapper) => {
			let anchorElement: HTMLAnchorElement | null =
				embedWrapper.querySelector(".embed-card");
			if (anchorElement) {
				let youtubeURL: string = anchorElement.href;
				let videoID: string = "";
				if (youtubeURL) {
					if (youtubeURL.includes("youtube.com/watch?v=")) {
						videoID = youtubeURL.split("v=")[1];
					} else if (youtubeURL.includes("youtu.be/")) {
						videoID = youtubeURL.split("youtu.be/")[1];
					}
				}
        embedWrapper.innerHTML = '';
				this._buildIframe(embedWrapper, videoID);
			}
		});
	}

	private _buildIframe(block: HTMLDivElement, videoID: string): HTMLIFrameElement {
		const iframe: HTMLIFrameElement = this.render2.createElement("iframe");
		this.render2.setAttribute(
			iframe,
			"src",
			`https://www.youtube.com/embed/${videoID}`
		);
		this.render2.setAttribute(iframe, "frameborder", "0");
		this.render2.setAttribute(iframe, "allowfullscreen", "true");
		this.render2.appendChild(block, iframe);
		return iframe;
	}
}
