def remove_quotes_from_csv(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as infile, \
            open(output_file, 'w', encoding='utf-8') as outfile:
        for line in infile:
            outfile.write(line.replace('"', ''))


# Utilisation du script
input_filepath = 'metiers_before.csv'
output_filepath = 'metiers.csv'
remove_quotes_from_csv(input_filepath, output_filepath)
