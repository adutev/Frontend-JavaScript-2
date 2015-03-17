import csv, re

input_file = []

with open('csv.csv', 'rb') as csvfile:
	file_reader = csv.reader(csvfile)

	for row in file_reader:
		input_file.append(row)

def select_without_limit():
	columns = find_columns(len(commands))	
	column_index_to_select = []
	
	# Check columns position in input_file
	for row in input_file[0]:
		for col in columns:
			if col in row:
				column_index_to_select.append(input_file[0].index(col))
	result = ""

	for row in range(0, len(input_file)):
		for col in range(0, len(input_file[0])):
			if col in column_index_to_select:
				result += "| " + input_file[row][col]
		result+= " |\n"

	print result	

def select_limit():
	index_of_limit = commands.index('LIMIT')
	if index_of_limit == len(commands) - 1:
		print("No limit specified")
	else:
		columns = find_columns(index_of_limit + 1)
		limit = int(find_limit(index_of_limit))
		if limit >= len(input_file):
			limit = len(input_file) - 1

		column_index_to_select = []
		
		# Check columns position in input_file
		for row in input_file[0]:
			for col in columns:
				if col in row:
					column_index_to_select.append(input_file[0].index(col))
		result = ""


		for row in range(0, limit + 1):
			for col in range(0, len(input_file[0])):
				if col in column_index_to_select:
					result += "| " + input_file[row][col]
			result+= " |\n" 
		print result

def sum_column():
	column = commands[1]
	sum = 0
	index_of_column = input_file[0].index(column)
	if input_file[1][index_of_column].isdigit():
		for row in range(1, len(input_file)):
			sum += int(input_file[row][index_of_column])
		print ("The sum is: " + str(sum))
	else:
		print "Can not sum this column."

def show_command():
	print ", ".join(input_file[0])

def find_all_rows_containing_substring():
	substring = commands[1]
	rows_to_print = [input_file[0]]

	for i in range(1, len(input_file)):
		for col in input_file[i]:
			if substring in col:
				rows_to_print.append(input_file[i])
				break
	result = "|"
	for row in rows_to_print:
		result += "|".join(row)
		result += '|\n'
	print result

def find_columns(end_of_commands):
	columns = []
	for i in range(1, end_of_commands):
		columns.append(commands[i])
	if len(columns) > 0:
		return columns
	elif len(columns) < 1:
		print("No colums specified")

def find_limit(index_of_limit):
		return commands[index_of_limit + 1]

while True:
	input_line = raw_input("querry>")
	input_line = str(input_line)

	while True:
		p = re.compile(ur'[,|\s]?([A-z0-9\-]+)+[,|\s]?', re.IGNORECASE)
		commands = re.findall(p, input_line)

		if not commands:
			print("Please enter something!")
			break
		else:
			querry = commands[0]
			if querry == 'SELECT':
				if len(commands) == 1:
					print('No enought SELECT parameters')
					break
				else:
					if 'LIMIT' in commands:
						select_limit()
						break
					else:
						select_without_limit()
						break
			elif querry == 'SUM':
				if len(commands) == 1:
					print('No enought SUM parameters')
					break
				else:
					sum_column()
					break
			elif querry == 'SHOW':
				show_command()
				break
			elif querry == 'FIND':
				find_all_rows_containing_substring()
				break
			else:
				print "Illegal querry!"
				break