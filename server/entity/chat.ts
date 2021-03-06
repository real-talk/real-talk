import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm'
import { Message } from "./message";
import { User } from "./user";
import { Recipient } from "./recipient";

interface ChatConstructor {
  createdAt?: Date,
  name?: string;
  picture?: string;
  allTimeMembers?: User[];
  listingMembers?: User[];
  actualGroupMembers?: User[];
  admins?: User[];
  owner?: User
  messages?: Message[]
}
@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: string

  @CreateDateColumn({ nullable: true })
  createdAt: Date

  @Column({ nullable: true })
  name: string

  @Column({ nullable: true })
  picture: string

  @ManyToMany(type => User, user => user.allTimeMemberChats, {
    cascade: ['insert', 'update'],
    eager: false,
  })
  @JoinTable()
  allTimeMembers: User[]

  @ManyToMany(type => User, user => user.listingMemberChats, {
    cascade: ['insert', 'update'],
    eager: false,
  })
  @JoinTable()
  listingMembers: User[]

  @ManyToOne(type => User, user => user.ownerChats, { 
    cascade: ['insert', 'update'], eager: false })
    owner?: User | null

  @OneToMany(type => Message, message => message.chat, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  messages: Message[]

  @OneToMany(type => Recipient, recipient => recipient.chat)
  recipients: Recipient[];

  constructor({
    createdAt,
    name,
    picture,
    allTimeMembers,
    listingMembers,
    actualGroupMembers,
    admins,
    owner,
    messages,
  }: ChatConstructor = {}) {
    if (name) {
      this.name = name
    }
    if (picture) {
      this.picture = picture
    }
    if (allTimeMembers) {
      this.allTimeMembers = allTimeMembers
    }
    if (listingMembers) {
      this.listingMembers = listingMembers
    }
    if (owner) {
      this.owner = owner
    }
    if (messages) {
      this.messages = messages
    }
  }
}

export default Chat