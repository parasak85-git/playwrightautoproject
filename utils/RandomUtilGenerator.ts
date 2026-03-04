import { faker } from '@faker-js/faker';

export class RandomUtilGenerator {

    static getFirstName(): string {
        return faker.person.firstName();
    }

    static getLastName(): string {
        return faker.person.lastName();
    }

    static getEmailAddress(): string {
        return faker.internet.email();
    }
    static getPassword(): string {
        return faker.internet.password();
    }
    static getTelephoneNumber(): string {
        return faker.phone.number();
    }

}