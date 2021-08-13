#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { EcrStack } from '../lib/ecr-stack';
import {AwsGloryService} from "../lib/services/aws-glory-service";

const app = new cdk.App();

new AwsGloryService(app, 'aws-glory-app')
