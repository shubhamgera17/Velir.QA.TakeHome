import { test, expect } from '@playwright/test';
import { HotelBookingPage } from '../pages/HotelBookingPage';
import { generateRandomPhone } from '../utils/TestDataGenerator';

test.describe('UI Tests - Email Validation', () => {
  let hotelBookingPage: HotelBookingPage;

  test.beforeEach(async ({ page }) => {
    hotelBookingPage = new HotelBookingPage(page);
    await hotelBookingPage.navigateToRoomBooking(1);
  });

  test('[NEGATIVE] Should show validation error for invalid email address', async () => {

    // Arrange
    const firstName = 'John';
    const lastName = 'Doe';
    const invalidEmail = 'abc.com';
    const phone = generateRandomPhone();

    // Act
    await hotelBookingPage.clickReserveNow();

    await hotelBookingPage.fillBookingForm(
      firstName,
      lastName,
      invalidEmail,
      phone
    );

    await hotelBookingPage.submitBooking();

    // Assert
    const validationMessage = await hotelBookingPage.getErrorMessages();

    expect(validationMessage).toContain(
      'must be a well-formed email address'
    );
  });
});