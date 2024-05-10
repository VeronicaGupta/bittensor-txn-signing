# Add your binary directories to the PATH variable
export PATH := /home/parnika/Documents/cypherock/x1_dev_env/cmake-3.29.2-linux-x86_64/bin:/home/parnika/Documents/cypherock/x1_dev_env/gcc-arm-none-eabi-10.3-2021.10-x86_64-linux/gcc-arm-none-eabi-10.3-2021.10/bin:$(PATH)
# Your Makefile rules here
CC=arm-none-eabi-gcc
CFLAGS=-Wall -g -O0 -lm -lc
 
ODIR=.
_OBJ =  src/type/boolean.o src/type/compact.o src/type/enumeration.o src/type/fixed_int.o src/type/option.o src/type/string.o src/type/tuple.o src/type/vector.o src/util/hex.o src/scale.o
OBJ = $(patsubst %,$(ODIR)/%,$(_OBJ))

# PREFIX is environment variable, but if it is not set, then set default value
ifeq ($(PREFIX),)
    PREFIX := /usr/local
endif

$(ODIR)/%.o: %.c
	$(CC) -c -o $@ $< $(CFLAGS)

test: $(OBJ)
	$(CC) -g -o $@ $^ src/test/boolean.c src/test/compact.c src/test/enumeration.c src/test/fixed_int.c src/test/option.c src/test/structure.c src/test/vector.c src/test/string.c src/test/tuple.c src/test/test.c $(CFLAGS)

cli: $(OBJ)
	$(CC) -o $@ $^ src/cli.c $(CFLAGS)

libcScale.a: $(OBJ)
	ar rcs $@ $^

all: cli test libcScale.a

.PHONY: clean install

clean:
	rm -rf test cli src/*.o src/test/*.o src/type/*.o src/util/*.o *~ *.a *.dSYM

install:
	install -d $(DESTDIR)$(PREFIX)/lib/
# _getpidinstall -m 557 libcScale.a $(DESTDIR)$(PREFIX)/lib/
	install -d $(DESTDIR)$(PREFIX)/include/
	install -m 557 src/scale.h $(DESTDIR)$(PREFIX)/include/


