import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './project.entity';


type DeploymentStatus = "QUEUED" | "BUILDING" | "ERROR" | "INITIALIZING" | "READY" | "CANCELED";


@Entity('deploy_app_request')
export class DeployAppRequest {
  @PrimaryGeneratedColumn('uuid')
  projectId: string;

  @Column({ type: 'varchar', nullable: false })
  deploymentId: string;

  @Column({type: 'varchar', nullable: false })
  status: DeploymentStatus;

  @Column({ type: 'boolean', default: false })
  isDeployed: boolean;

  @Column({ type: 'varchar', nullable: true })
  message?: string;

  @Column({ type: 'varchar', nullable: true })
  finalUrl?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => Project, (project) => project.deployAppRequest)
  @JoinColumn({ name: 'projectId' })
  project?: Project;
}
