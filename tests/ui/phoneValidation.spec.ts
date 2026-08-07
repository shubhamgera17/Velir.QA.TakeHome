import { test, expect } from '@playwright/test';
import { HotelBookingPage } from '../pages/HotelBookingPage';
import { generateRandomEmail } from '../utils/TestDataGenerator';

test.describe('UI Tests - Phone Validation', () => {
  let hotelBookingPage: HotelBookingPage;

  test.beforeEach(async ({ page }) => {
    hotelBookingPage = new HotelBookingPage(page);
    await hotelBookingPage.navigateToRoomBooking(1);
  });

  test('[NEGATIVE] Should show validation error for phone number shorter than minimum length', async () => {

    // Arrange
    const firstName = 'John';
    const lastName = 'Doe';
    const email = generateRandomEmail();
    const shortPhone = '123';

    // Act
    await hotelBookingPage.clickReserveNow();

    await hotelBookingPage.fillBookingForm(
      firstName,
      lastName,
      email,
      shortPhone
    );

    await hotelBookingPage.submitBooking();

    // Assert
    const validationMessage = await hotelBookingPage.getErrorMessages();

    expect(validationMessage).toContain(
      'size must be between 11 and 21'
    );
  });
});