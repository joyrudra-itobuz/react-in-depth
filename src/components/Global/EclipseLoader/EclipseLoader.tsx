import { ImgHTMLAttributes } from 'react';
import './_EclipseLoader.scss';

export default function EclipseLoader({
  ...divProps
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <div
      className={'loadingio-spinner-eclipse-j83xt0vae3 ' + divProps.className}
    >
      <div className='ldio-3yx60ayhuxy'>
        <div></div>
      </div>
    </div>
  );
}
