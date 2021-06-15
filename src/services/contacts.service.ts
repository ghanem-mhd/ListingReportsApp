import { getRepository } from 'typeorm';
import { ContactEntity } from '@entity/contacts.entity';
import { ContactDto } from '@dtos/contacts.dto';

class ContactService {
  public contacts = ContactEntity;

  public saveContacts(contacts: ContactDto[]): void {
    const contactRepository = getRepository(this.contacts);
    contactRepository.save(contacts);
  }
}

export default ContactService;
