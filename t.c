#include <stdint.h>
#include <stdio.h>

double hexArrayToDouble(const uint8_t *hexArray, size_t length) {
    double result = 0.0;
    for (size_t i = 0; i < length; i++) {
        result *= 256.0; // Shift existing bits by one byte
        result += hexArray[i]; // Add current byte value
    }
    return result;
}

int main() {
    uint8_t hexArray[] = {0x91, 0x01}; // Example: { 0x91, 0x01 } corresponds to 37121
    size_t length = sizeof(hexArray) / sizeof(hexArray[0]);

    // Convert the hexadecimal uint8 array to a double-precision floating-point integer
    double result = hexArrayToDouble(hexArray, length);

    // Print the result
    printf("Result: %.0f\n", result); // Use %.0f to print as integer

    return 0;
}
