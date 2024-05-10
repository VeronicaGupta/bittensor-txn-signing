
#include <stdio.h>
#include <stdint.h>
#include <math.h>
#include "scale.h"


// Function to convert a hexadecimal value represented as a uint8_t array to its decimal equivalent in WND
double hexToDecimalWND(const uint8_t *hexValue, size_t length) {
    // Convert hexadecimal value to decimal value
    
    // scale_compact_int compact = SCALE_COMPACT_INT_INIT;
    // memcpy(compact.data, hexValue, length);
    // char *compact_hex = decode_compact_to_hex(&compact);
    // uint16_t decimalValue = strtoull(compact_hex, NULL, 16);
    // printf("%s = %u\n", compact_hex, decimalValue);
    // free(compact_hex);

    double decimalValue;
    // Scale the decimal value to represent WND
    decimalValue *= 1e-12; // Scaling by 10^-12 for WND

    return decimalValue;
}

int main() {
    // Example hex values represented as uint8_t arrays
    uint8_t hexValue1[] = {0x04}; // Hex value: 04
    uint8_t hexValue2[] = {0x08}; // Hex value: 08
    uint8_t hexValue3[] = {0x0c}; // Hex value: 0c
    uint8_t hexValue4[] = {0x10}; // Hex value: 10
    uint8_t hexValue5[] = {0x91, 0x01}; // Hex value: 9101

    // Calculate decimal values
    double decimalValue1 = hexToDecimalWND(hexValue1, sizeof(hexValue1) / sizeof(hexValue1[0]));
    double decimalValue2 = hexToDecimalWND(hexValue2, sizeof(hexValue2) / sizeof(hexValue2[0]));
    double decimalValue3 = hexToDecimalWND(hexValue3, sizeof(hexValue3) / sizeof(hexValue3[0]));
    double decimalValue4 = hexToDecimalWND(hexValue4, sizeof(hexValue4) / sizeof(hexValue4[0]));
    double decimalValue5 = hexToDecimalWND(hexValue5, sizeof(hexValue5) / sizeof(hexValue5[0]));

    // Print decimal values
    printf("Hex value: 04, Decimal value: %.12f WND\n", decimalValue1);
    printf("Hex value: 08, Decimal value: %.12f WND\n", decimalValue2);
    printf("Hex value: 0c, Decimal value: %.12f WND\n", decimalValue3);
    printf("Hex value: 10, Decimal value: %.12f WND\n", decimalValue4);
    printf("Hex value: 9101, Decimal value: %.12f WND\n", decimalValue5);

    return 0;
}