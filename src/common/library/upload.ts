// import axios from 'axios';
// import aws from 'aws-sdk';
// import { AwsService } from '../../aws/aws.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  // private STORAGE_BUCKET: string;
  // private STORAGE_KEY_ID: string;
  // private STORAGE_SECRET_KEY: string;
  // private STORAGE_REGION: string;
  // private ENVIRONMENT: string;
  // // private URL_UPLOAD: string
  // private UPLOAD_AUTHORIZATION: string;
  // private ENV: string;
  // constructor(private awsService: AwsService) {
  //   this.STORAGE_BUCKET = this.awsService.getSecretManager('STORAGE_BUCKET');
  //   this.STORAGE_KEY_ID = this.awsService.getSecretManager('STORAGE_KEY_ID');
  //   this.STORAGE_SECRET_KEY =
  //     this.awsService.getSecretManager('STORAGE_SECRET_KEY');
  //   this.STORAGE_REGION = this.awsService.getSecretManager('STORAGE_REGION');
  //   this.ENVIRONMENT = this.awsService.getSecretManager('ENVIRONMENT');
  //   // this.URL_UPLOAD = this.awsService.getSecretManager("URL_UPLOAD");
  //   this.UPLOAD_AUTHORIZATION = this.awsService.getSecretManager(
  //     'UPLOAD_AUTHORIZATION',
  //   );
  //   this.ENV = this.awsService.getSecretManager('ENV');
  // }
  // async uploadBisaekspor(file) {
  //   const URL_UPLOAD = 'https://upload.bisaekspor.com/no-compress';
  //   const UPLOAD_AUTHORIZATION: string = this.UPLOAD_AUTHORIZATION;
  //   const ENV: string = this.ENV;
  //   const resPostImage: any = await axios.post(
  //     URL_UPLOAD,
  //     {
  //       environment: 'development',
  //       file_path: `/${ENV === 'development' ? 'test' : 'production'}/`,
  //       file: file,
  //     },
  //     {
  //       headers: {
  //         Authorization: UPLOAD_AUTHORIZATION,
  //       },
  //       maxContentLength: Infinity,
  //       maxBodyLength: Infinity,
  //     },
  //   );
  //   console.log('SUCCESS UPLOAD ASSET ==> ', resPostImage);
  //   return {
  //     status_code: 200,
  //     status_message: resPostImage?.message || 'Success respone data',
  //     data: resPostImage?.data || '',
  //   };
  // }
  // async uploadAws(file, filePath) {
  //   const STORAGE_BUCKET: string = this.STORAGE_BUCKET;
  //   const STORAGE_KEY_ID: string = this.STORAGE_KEY_ID;
  //   const STORAGE_SECRET_KEY: string = this.STORAGE_SECRET_KEY;
  //   const STORAGE_REGION: string = this.STORAGE_REGION;
  //   const ENVIRONMENT: string = this.ENVIRONMENT;
  //   // const MB = 1024 * 1024;
  //   await aws.config.update({
  //     accessKeyId: STORAGE_KEY_ID,
  //     secretAccessKey: STORAGE_SECRET_KEY,
  //     region: STORAGE_REGION,
  //   });
  //   const s3 = new aws.S3();
  //   return s3
  //     .upload({
  //       Bucket: STORAGE_BUCKET,
  //       ACL: 'public-read',
  //       Key: `${ENVIRONMENT}/${filePath}`,
  //       Body: file,
  //       ContentEncoding: 'base64',
  //       ContentType: 'file/pdf',
  //     })
  //     .promise();
  // }
}
