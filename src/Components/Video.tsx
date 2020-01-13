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

export class Video extends PureComponent<IProps> {
  static defaultProps = {
    controls: true
  };

  //Render iframe video (youtube or vimeo)
  public render(): ReactNode {
    const { src, autoPlay, controls, width, height } = this.props;
    return (
      <iframe
        src={src + (controls ? "" : "?controls=0")}
        width={width}
        height={height}
        allow={"encrypted-media; " + autoPlay ? "autoplay" : ""}
        allowFullScreen={true}
        style={{ border: "none" }}
      />
    );
  }
}
