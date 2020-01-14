import React, { PureComponent, ReactNode } from "react";

interface IProps {
  src: string;

  width?: number | string;
  height?: number | string;

  controls: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

type playerType = "iFrame" | "htmlVideo";

interface IMedia {
  url: string;
  type: playerType;
}

export class Video extends PureComponent<IProps> {
  static defaultProps = {
    controls: true
  };

  private convertToMedia(src: string): IMedia {
    //YouTube
    if (src.indexOf("youtu") >= 0) {
      const fullUrl = src
        .replace("watch?v=", "")
        .replace("youtu.be", "youtube.com");

      return {
        url:
          fullUrl.indexOf("embed") < 0
            ? fullUrl.replace("youtube.com", "youtube.com/embed")
            : fullUrl,
        type: "iFrame"
      };
    }

    //Vimeo
    if (src.indexOf("vimeo") >= 0) {
      return {
        url:
          src.indexOf("player") >= 0 || src.indexOf("video") >= 0
            ? src
            : src.replace("vimeo.com", "player.vimeo.com/video"),
        type: "iFrame"
      };
    }

    //Other videoplayer
    return { url: src, type: "htmlVideo" };
  }

  //Render videoplayer
  public render(): ReactNode {
    const media: IMedia = this.convertToMedia(this.props.src);

    const { autoPlay, controls, width, height, loop, muted } = this.props;

    if (media.type === "iFrame") {
      return (
        <iframe
          src={media.url + (controls ? "" : "?controls=0")}
          width={width}
          height={height}
          allow={"encrypted-media; " + autoPlay ? "autoplay" : ""}
          allowFullScreen={true}
          style={{ border: "none" }}
        />
      );
    } else {
      return (
        <video
          width={width}
          height={height}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          controls={controls}
          playsInline
        >
          <source src={media.url} type="video/mp4" />
          Your browser does not support the videoplayer.
        </video>
      );
    }
  }
}
