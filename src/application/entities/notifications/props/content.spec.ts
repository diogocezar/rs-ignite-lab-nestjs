import { Content } from 'src/application/entities/notifications/props/content';

describe('Notification Content', () => {
  it('should be able to create a content', () => {
    const content = new Content('Some content');
    expect(content.value).toBeTruthy();
  });

  it('should not be able to create a content with less than 5 characters', () => {
    expect(() => {
      new Content('foo');
    }).toThrowError('Content must be between 5 and 240 characters');
  });

  it('should not be able to create a content with more than 5 characters', () => {
    expect(() => {
      new Content('x'.repeat(241));
    }).toThrowError('Content must be between 5 and 240 characters');
  });
});
